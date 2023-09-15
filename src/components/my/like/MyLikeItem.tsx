import LikeButton from "@/components/LikeButton";
import { Product } from "@/customType/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function MyLikeItem({ product }: Props) {
  return (
    <Link className="pb-6" href={"/"}>
      <div className="relative py-5 bg-[#f1f1f1]">
        <Image
          className="w-full object-cover aspect-square"
          src={product.imageUrl}
          alt="order-thumbnail"
          width={300}
          height={300}
        />
        <LikeButton
          className="h-8 w-8 bg-white absolute bottom-2 right-2 flex items-center justify-center"
          productId={product.id}
          iconStyle="home"
          iconClassName="w-5 h-5"
        />
      </div>
      <div className="pt-2">
        <p className="font-sm">{product.name}</p>
        <p className="mt-1 text-[#6c6c6c] text-[13px]">
          {product.price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
