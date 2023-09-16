"use client";
import { useState, useCallback } from "react";
import CategoryItem from "./CategoryItem";
import { CategoryValue } from "@/customType/category";
import { subcategories } from "@/constants/categories";
import { useProductsByFilter } from "@/hooks/products";
import InfiniteScrollSentinel from "@/components/InfiniteScrollSentinel";
import FilterBar from "./FilterBar";

type Props = {
  category: CategoryValue;
  subcategory: number;
  sort: string;
};

export default function CategoryItemList({
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

  const [filterOpen, setFilterOpen] = useState<"LEFT" | "RIGHT">();

  const handleInterSect = useCallback(() => {
    if (data && data.at(-1)?.length && !isValidating) {
      setSize(size + 1);
    }
  }, [size, data, setSize, isValidating]);

  if (!data) {
    return <Skeleton />;
  }

  return (
    <section>
      <FilterBar
        filterOpen={filterOpen}
        subcategory={subcategories[category][subcategory]}
        categoryIndex={subcategory}
        category={category}
        sort={sort}
        setFilterOpen={setFilterOpen}
      />
      <div className="pt-[25px] px-4 relative">
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
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div>
      <div className="h-[40px] w-full flex justify-around">
        <div className="h-full w-2/5 bg-[#efefef] mt-1 rounded-sm"></div>
        <div className="h-full w-2/5 bg-[#efefef] mt-1  rounded-sm"></div>
      </div>
      <div className="pt-[25px] px-4 relative">
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-10">
            <div className="w-full relative pb-[125%] bg-[#efefef]"></div>
            <h3 className="w-3/5 h-[15px] bg-[#efefef] mt-2 mb-1"></h3>
            <div className="w-1/5 h-[15px] bg-[#efefef]"></div>
          </div>
          <div className="mb-10">
            <div className="w-full relative pb-[125%] bg-[#efefef]"></div>
            <h3 className="w-3/5 h-[15px] bg-[#efefef] mt-2 mb-1"></h3>
            <div className="w-1/5 h-[15px] bg-[#efefef]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
