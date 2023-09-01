"use client";
import Image from "next/image";
import Feature from "@/components/ui/Feature";
import { Product } from "@/customType/product";
import Link from "next/link";
import useCurrentUser from "@/hooks/user";
import LikeButton from "@/components/LikeButton";

type Props = {
  product: Product;
};

export default function CategoryItem({ product }: Props) {
  return (
    <Link href={`items/${product.id}`}>
      <div className="mb-10 cursor-pointer">
        <div className="w-full relative pb-[125%]">
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt={product.name}
            fill
          />
          <LikeButton
            productId={product.id}
            iconStyle="home"
            className="w-8 h-8 bg-neutral-100 opacity-90 absolute bottom-2 right-2 flex items-center justify-center"
          />
        </div>
        <h3 className="text-sm mt-2">{product.name}</h3>
        <div className="text-[13px] text-[#6c6c6c] py-1">{`${product.price.toLocaleString()}원`}</div>
        <Feature text={`${product.orderUserCount}명이 주문중`} />
      </div>
    </Link>
  );
}
