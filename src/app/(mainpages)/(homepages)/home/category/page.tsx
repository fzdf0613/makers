"use client";
import CategoryItem from "@/components/home/category/CategoryItem";
import FilterBar from "@/components/home/category/FilterBar";
import QuickLinkCard from "@/components/home/category/QuickLinkCard";
import { subcategories } from "@/constants/categories";
import { CategoryValue } from "@/customType/category";
import { useProductsByFilter } from "@/hooks/products";
import { getRandomIndex } from "@/util/random";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage({
  searchParams,
}: {
  searchParams: {
    category: CategoryValue;
    subcategory: number;
    sort: string;
  };
}) {
  const router = useRouter();
  const { products, error, isLoading } = useProductsByFilter({
    category: searchParams.category,
    subcategory: searchParams.subcategory,
    sort: searchParams.sort,
  });

  useEffect(() => {
    if (
      !["food", "beauty", "appliance", "fashion", "living"].includes(
        searchParams.category
      ) ||
      searchParams.subcategory >= subcategories[searchParams.category].length ||
      searchParams.subcategory < 0
    ) {
      router.replace("/");
    }
  }, [router, searchParams.category, searchParams.subcategory]);

  const [filterOpen, setFilterOpen] = useState<"LEFT" | "RIGHT">();

  return (
    <>
      {products && (
        <QuickLinkCard product={products[getRandomIndex(products.length)]} />
      )}
      <FilterBar
        category={searchParams.category}
        categoryIndex={searchParams.subcategory}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        sort={searchParams.sort}
        subcategory={
          subcategories[searchParams.category][searchParams.subcategory]
        }
      />
      <div className="pt-[25px] px-4 relative">
        <div className="grid grid-cols-2 gap-2">
          {filterOpen && (
            <div className="absolute w-full h-full left-0 top-0 bg-[#000] opacity-30 z-[5]" />
          )}
          {products &&
            products.map((product) => (
              <CategoryItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
