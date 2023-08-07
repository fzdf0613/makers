"use client";
import Image from "next/image";
import LikeButton from "./LikeButton";
import Heading from "../ui/Heading";
import Description from "../ui/Description";
import Feature from "../ui/Feature";
import Badge from "../ui/Badge";
import { Product } from "@/customType/product";

type Props = {
  product: Product;
};

export default function HomeItem({ product }: Props) {
  return (
    <div className="mb-9">
      <div className="relative w-full pb-[56.25%]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute left-4 -bottom-2">
          <Badge text="매진 임박" style="alert" />
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <Heading text={product.homeTitle} />
        <Description text={product.description} />
        {/* <Feature text={item.feature} customStyle="pt-2" /> */}
        <LikeButton count={product.likeCount} />
      </div>
    </div>
  );
}
