"use client";
import { useCallback } from "react";
import CategoryItem from "./CategoryItem";
import { CategoryValue } from "@/customType/category";
import { useProductsByFilter } from "@/hooks/products";
import InfiniteScrollSentinel from "@/components/InfiniteScrollSentinel";

type Props = {
  filterOpen: "LEFT" | "RIGHT" | undefined;
  category: CategoryValue;
  subcategory: number;
  sort: string;
};

export default function CategoryItemList({
  filterOpen,
  category,
  subcategory,
  sort,
}: Props) {
  const { data, error, isLoading, isValidating, size, setSize } =
    useProductsByFilter({
      category,
      subcategory,
      sort,
    });

  const handleInterSect = useCallback(() => {
    if (data && data.at(-1)?.length && !isValidating) {
      setSize(size + 1);
    }
  }, [size, data, setSize, isValidating]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {filterOpen && (
        <div className="absolute w-full h-full left-0 top-0 bg-[#000] opacity-30 z-[5]" />
      )}
      {data?.map((products) => {
        return products.map((product, i) => (
          <CategoryItem
            key={product.id}
            product={product}
            imagePrioiry={i < 4}
          />
        ));
      })}
      {size === 1 && data?.at(-1)?.length === 0 && (
        <div className="col-span-2 h-[375px] flex justify-center items-center">
          현재 판매중인 제품이 없습니다.
        </div>
      )}
      <InfiniteScrollSentinel onIntersect={handleInterSect} />
    </div>
  );
}
