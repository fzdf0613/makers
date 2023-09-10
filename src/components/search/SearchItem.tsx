import { Product } from "@/customType/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function SearchItem({ product }: Props) {
  return (
    <Link href={`/items/${product.id}`}>
      <li className="py-[15px] flex border-b border-[#f1f1f1]">
        <div className="w-40 h-[112px] relative">
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
              isOrderEnd(new Date(product.orderEndTime))
                ? "text-[#9b9b9b]"
                : "text-[#ed554d]"
            }`}
          >
            {isOrderEnd(new Date(product.orderEndTime))
              ? "주문 종료"
              : `${product.orderUserCount}명 주문 중`}
          </div>
        </div>
      </li>
    </Link>
  );
}

function isOrderEnd(endDate: Date) {
  const today = new Date();
  return today.getTime() > endDate.getTime();
}
