"use client";
import { usePreorderProducts } from "@/hooks/products";
import PreorderItem from "./PreorderItem";

export default function PreorderItemList() {
  const { products, isLoading } = usePreorderProducts();
  return (
    <div className="mb-10">
      {!isLoading && products?.length === 0 && (
        <div className="h-[500px] flex items-center justify-center">
          오픈 예정인 상품이 없습니다.
        </div>
      )}
      {products &&
        products.map((product) => (
          <PreorderItem key={product.id} product={product} />
        ))}
    </div>
  );
}
