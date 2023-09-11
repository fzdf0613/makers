import Feature from "@/components/ui/Feature";
import CloseIcon from "@/components/ui/icons/CloseIcon";
import { Product } from "@/customType/product";
import { isOnOrder } from "@/util/date";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  handleCancel: () => void;
};

export default function SeenItem({ product, handleCancel }: Props) {
  return (
    <Link href={`/items/${product.id}`}>
      <div className="py-4 flex border-y border-[#f1f1f1]">
        <div className="w-[160px] h-[112px] relative min-w-[160px]">
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt="product-thumbnail"
            fill
            sizes="160px"
          />
        </div>
        <div className="pl-4 flex flex-col grow">
          <div className="relative flex flex-col justify-between grow">
            <div>
              <h3 className="text-sm pr-10 line-clamp-2">{product.name}</h3>
              <button
                className="h-5 w-5 absolute top-[3px] right-0 rounded-full text-white bg-[#b1b1b1] flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
              >
                <CloseIcon />
              </button>
              <div className="mt-1 text-[13px] text-[#6c6c6c]">
                {product.price.toLocaleString()}원
              </div>
            </div>
            <div>
              <Feature
                text={
                  isOnOrder(new Date(product.orderEndTime))
                    ? "주문 중"
                    : "주문 종료"
                }
                style={
                  isOnOrder(new Date(product.orderEndTime))
                    ? undefined
                    : "disabled"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
