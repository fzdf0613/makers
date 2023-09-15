import React from "react";
import MyLikeItem from "@/components/my/like/MyLikeItem";
import { useProducts } from "@/hooks/products";

export default function MyLikeList() {
  const { products } = useProducts("like");
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {products?.map((product) => (
        <MyLikeItem key={product.id} product={product} />
      ))}
      {products?.length === 0 && (
        <div className="col-span-2 h-[375px] flex justify-center items-center">
          현재 판매중인 제품이 없습니다.
        </div>
      )}
    </div>
  );
}
