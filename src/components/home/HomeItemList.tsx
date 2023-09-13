"use client";
import { useState } from "react";
import { useProductsByFilter } from "@/hooks/products";
import HomeItem from "./HomeItem";
import Dropdown from "@/components/ui/Dropdown";
import { sortItemList } from "@/constants/sortItems";

export default function HomeItemList() {
  const [sort, setSort] =
    useState<(typeof sortItemList)[number]["value"]>("LATEST");

  const { products, error, isLoading } = useProductsByFilter({
    category: "all",
    subcategory: 0,
    sort,
  });
  return (
    <section>
      <div className="pb-3">
        <Dropdown
          selectedOption={sort}
          handleSelect={(option) => {
            setSort(option);
          }}
        />
      </div>
      {products && (
        <ul>
          {products.map((item, i) => (
            <li key={item.id}>
              <HomeItem product={item} imagePriority={i < 5} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
