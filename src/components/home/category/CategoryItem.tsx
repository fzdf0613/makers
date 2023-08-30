"use client";
import Image from "next/image";
import Feature from "@/components/ui/Feature";
import { Product } from "@/customType/product";
import Link from "next/link";
import LikeIcon2 from "@/components/ui/icons/LikeIcon2";
import useCurrentUser from "@/hooks/user";
import { signIn } from "next-auth/react";

type Props = {
  product: Product;
};

export default function CategoryItem({ product }: Props) {
  const { user, toggleLike } = useCurrentUser();
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
          <div className="w-8 h-8 bg-neutral-100 opacity-90 absolute bottom-2 right-2 flex items-center justify-center">
            <button
              onClick={
                user
                  ? (e) => {
                      e.preventDefault();
                      toggleLike(product.id, !user.like.includes(product.id));
                    }
                  : (e) => {
                      e.preventDefault();
                      signIn();
                    }
              }
            >
              <LikeIcon2
                className="text-lg"
                active={user ? user.like.includes(product.id) : false}
              />
            </button>
          </div>
        </div>
        <h3 className="text-sm mt-2">{product.name}</h3>
        <div className="text-[13px] text-[#6c6c6c] py-1">{`${product.price.toLocaleString()}원`}</div>
        <Feature text={`${product.orderUserCount}명이 주문중`} />
      </div>
    </Link>
  );
}
