"use client";
import { useState } from "react";
import { categoriesForUI } from "@/constants/categories";
import SlideBar from "../SlideBar";

export default function HomeCategoryBar() {
  const [category, setCategory] = useState("전체");

  return (
    <SlideBar
      itemList={categoriesForUI.map((item) => ({
        text: item.title,
        url: item.url,
      }))}
      selectedStyle="bg-[#1a1a1a] font-bold text-white"
      selectItem={(item) => {
        setCategory(item);
      }}
      currentItem={category}
    />
  );
}
