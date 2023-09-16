"use client";
import { useLayoutEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { categoriesForUI } from "@/constants/categories";
import SlideBar from "../SlideBar";
import SkeletonCategoryBar from "./skeleton/SkeletonCategoryBar";

export default function HomeCategoryBar() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");

  useLayoutEffect(() => {
    switch (pathName) {
      case "/":
        setCategory("전체");
        return;
      case "/new":
        setCategory("신규");
        return;
      case "/home/category":
        const categoryName = categoriesForUI.find(
          (item) => item.value === searchParams.get("category")
        )?.title;
        if (!categoryName) {
          return;
        }
        setCategory(categoryName);
        return;
      default:
        return;
    }
  }, [pathName, searchParams]);

  if (!category) {
    return <SkeletonCategoryBar />;
  }

  return (
    <SlideBar
      itemList={categoriesForUI.map((item) => ({
        text: item.title,
        url:
          pathName === "/home/category" && searchParams.get("sort") === "LATEST"
            ? item.url
            : `${item.url}`,
      }))}
      selectedStyle="bg-[#1a1a1a] font-bold text-white"
      selectItem={(item) => {
        setCategory(item);
      }}
      currentItem={category}
    />
  );
}
