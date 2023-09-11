import { Product } from "@/customType/product";
import { isOnOrder } from "@/util/date";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function SearchItem({ product }: Props) {
  return (
    <Link href={`/items/${product.id}`}>
      <li className="py-[15px] flex border-b border-[#f1f1f1]">
        <div className="w-40 h-[112px] min-w-[160px] relative">
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt="product-thumbnail"
            fill
            sizes="160px"
          />
        </div>
        <div className="pl-4 text-[13px]">
          <h3>{product.name}</h3>
          <div className="mt-1 text-[#6c6c6c]">
            {product.price.toLocaleString()}원
          </div>
          <div
            className={`mt-2 font-semibold ${
              isOnOrder(new Date(product.orderEndTime))
                ? "text-[#ed554d]"
                : "text-[#9b9b9b]"
            }`}
          >
            {isOnOrder(new Date(product.orderEndTime))
              ? `${product.orderUserCount}명 주문 중`
              : "주문 종료"}
          </div>
        </div>
      </li>
    </Link>
  );
}
