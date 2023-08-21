"use client";
import CategoryItem from "@/components/home/category/CategoryItem";
import FilterBar from "@/components/home/category/FilterBar";
import QuickLinkCard from "@/components/home/category/QuickLinkCard";
import { subcategories } from "@/constants/categories";
import { CategoryName } from "@/customType/category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage({
  searchParams,
}: {
  searchParams: {
    category: CategoryName;
    subcategory: number;
  };
}) {
  const router = useRouter();

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

  // const [subcategory, setSubcategory] = useState("전체");
  const [filter, setFilter] = useState("최신순");
  const [filterOpen, setFilterOpen] = useState<"LEFT" | "RIGHT">();

  return (
    <>
      <QuickLinkCard />
      <FilterBar
        category={searchParams.category}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filter={filter}
        setFilter={setFilter}
        subcategory={
          subcategories[searchParams.category][searchParams.subcategory]
        }
        // setSubcategory={setSubcategory}
      />
      <div className="pt-[25px] px-4 relative">
        <div className="grid grid-cols-2 gap-2">
          {filterOpen && (
            <div className="absolute w-full h-full left-0 top-0 bg-[#000] opacity-30 z-[5]" />
          )}
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
      </div>
    </>
  );
}
