"use client";
import CategoryItemList from "@/components/home/category/CategoryItemList";
import FilterBar from "@/components/home/category/FilterBar";
import QuickLinkCard from "@/components/home/category/QuickLinkCard";
import { subcategories } from "@/constants/categories";
import { CategoryValue } from "@/customType/category";
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
      <QuickLinkCard category={searchParams.category} />
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
        <CategoryItemList
          category={searchParams.category}
          subcategory={searchParams.subcategory}
          sort={searchParams.sort}
          filterOpen={filterOpen}
        />
      </div>
    </>
  );
}
