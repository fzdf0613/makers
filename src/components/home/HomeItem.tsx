"use client";
import Image from "next/image";
import HomeLikeButton from "./HomeLikeButton";
import Heading from "../ui/Heading";
import Description from "../ui/Description";
import Feature from "../ui/Feature";
import Badge from "../ui/Badge";
import { Product } from "@/customType/product";
import { isNew, isAlert } from "@/util/date";
import { useState } from "react";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function HomeItem({ product }: Props) {
  const [badgeState] = useState(getBadgeState(product));

  return (
    <div className="mb-9">
      <Link href={`/items/${product.id}`}>
        <div className="relative w-full pb-[56.25%]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          {badgeState && (
            <div className="absolute left-4 -bottom-2">
              <Badge text={badgeState.text} style={badgeState.style} />
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col">
          <Heading text={product.homeTitle} />
          <Description text={product.description} />
          <Feature
            text={`${product.orderUserCount.toLocaleString()}명이 주문했어요`}
            customStyle="pt-2"
          />
          <HomeLikeButton count={product.likeCount} productId={product.id} />
        </div>
      </Link>
    </div>
  );
}

function getBadgeState(product: Product) {
  const isNewProduct = isNew(product.orderStartDate, product.orderEndDate);
  const isImminent = isAlert(product.orderEndDate);
  const isAlmostSoldOut = product.currentOrderCount / product.itemCount > 0.9;

  if (isAlmostSoldOut) {
    return { text: "매진 임박", style: "alert" };
  }
  if (isImminent) {
    return { text: "마감 임박", style: "alert" };
  }
  if (isNewProduct) {
    return { text: "New", style: "default" };
  } else {
    return null;
  }
}
