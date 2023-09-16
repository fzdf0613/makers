"use client";
import { useCallback } from "react";
import { useNewProducts } from "@/hooks/products";
import HomeItem from "../HomeItem";
import InfiniteScrollSentinel from "@/components/InfiniteScrollSentinel";
import NewPageTitle from "@/components/home/new/NewPageTitle";
import SkeletonMainPage from "@/components/ui/skeleton/SkeletonMainPage";

export default function NewItemList() {
  const { data, isValidating, size, setSize } = useNewProducts();

  const handleInterSect = useCallback(() => {
    if (data && data.at(-1)?.length && !isValidating) {
      setSize(size + 1);
    }
  }, [size, data, setSize, isValidating]);

  if (!data) {
    return <SkeletonMainPage />;
  }

  return (
    <section>
      <NewPageTitle />
      {data?.map((products) => {
        return products.map((product, i) => (
          <HomeItem key={product.id} product={product} imagePriority={i < 4} />
        ));
      })}
      {size === 1 && data?.at(-1)?.length === 0 && (
        <div className="h-[375px] flex justify-center items-center">
          현재 판매중인 제품이 없습니다.
        </div>
      )}
      <InfiniteScrollSentinel onIntersect={handleInterSect} />
    </section>
  );
}
