"use client";
import MyLikeItem from "@/components/my/like/MyLikeItem";
import { useProducts } from "@/hooks/products";
import { MoonLoader } from "react-spinners";

export default function MyLikeList() {
  const { products, isValidating } = useProducts("like");
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {!isValidating &&
        products?.map((product) => (
          <MyLikeItem key={product.id} product={product} />
        ))}
      {isValidating && products?.length === 0 && (
        <div className="col-span-2 h-[375px] flex justify-center items-center">
          현재 판매중인 제품이 없습니다.
        </div>
      )}
      {isValidating && (
        <div className="col-span-2 h-[375px] flex justify-center items-center">
          <MoonLoader color="#9b9b9b" speedMultiplier={0.7} />
        </div>
      )}
    </div>
  );
}
