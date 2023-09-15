"use client";
import { useCallback } from "react";
import { usePreorderProducts } from "@/hooks/products";
import PreorderItem from "./PreorderItem";
import InfiniteScrollSentinel from "@/components/InfiniteScrollSentinel";

export default function PreorderItemList() {
  const { data, isValidating, size, setSize } = usePreorderProducts();

  const handleInterSect = useCallback(() => {
    if (data && data.at(-1)?.length && !isValidating) {
      setSize(size + 1);
    }
  }, [size, data, setSize, isValidating]);

  return (
    <div className="mb-10">
      {data?.map((products) => {
        return products.map((product, i) => (
          <PreorderItem
            key={product.id}
            product={product}
            imagePriority={i < 4}
          />
        ));
      })}
      {size === 1 && data?.at(-1)?.length === 0 && (
        <div className="h-[500px] flex items-center justify-center">
          오픈 예정인 상품이 없습니다.
        </div>
      )}
      <InfiniteScrollSentinel onIntersect={handleInterSect} />
    </div>
  );
}
