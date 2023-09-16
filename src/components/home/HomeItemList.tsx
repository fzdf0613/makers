"use client";
import { useState, useCallback } from "react";
import { useProductsByFilter } from "@/hooks/products";
import HomeItem from "./HomeItem";
import Dropdown from "@/components/ui/Dropdown";
import { sortItemList } from "@/constants/sortItems";
import InfiniteScrollSentinel from "../InfiniteScrollSentinel";
import SkeletonHomeItem from "./skeleton/SkeletonHomeItem";

export default function HomeItemList() {
  const [sort, setSort] =
    useState<(typeof sortItemList)[number]["value"]>("LATEST");

  const { data, error, isLoading, isValidating, size, setSize } =
    useProductsByFilter({
      category: "all",
      subcategory: 0,
      sort,
    });

  const handleInterSect = useCallback(() => {
    if (data && data.at(-1)?.length && !isValidating) {
      setSize(size + 1);
    }
  }, [size, data, setSize, isValidating]);

  return (
    <section>
      <div className="pb-3">
        <Dropdown
          isLoading={data === undefined}
          selectedOption={sort}
          handleSelect={(option) => {
            setSort(option);
          }}
        />
      </div>
      {!data && (
        <>
          <SkeletonHomeItem />
        </>
      )}
      {data &&
        data.map((products, i) => {
          return (
            <div key={i}>
              {products.map((product) => (
                <HomeItem
                  key={product.id}
                  product={product}
                  imagePriority={i < 5}
                />
              ))}
            </div>
          );
        })}
      {data && <InfiniteScrollSentinel onIntersect={handleInterSect} />}
    </section>
  );
}
