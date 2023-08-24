"use client";

import { Dispatch, SetStateAction } from "react";
import DropDownIcon from "@/components/ui/icons/DropDownIcon";
import DropUpIcon from "@/components/ui/icons/DropUpIcon";
import { subcategories } from "@/constants/categories";
import { CategoryValue } from "@/customType/category";
import Link from "next/link";
import { useScrollYContext } from "@/context/ScrollYContext";

const sortItemList = [
  { value: "LATEST", name: "최신순" },
  { value: "ORDER", name: "주문 많은 순" },
  { value: "CLOSING", name: "마감 임박 순" },
];

type Props = {
  filterOpen: "LEFT" | "RIGHT" | undefined;
  category: CategoryValue;
  categoryIndex: number;
  subcategory: string;

  sort: string;
  setFilterOpen: Dispatch<SetStateAction<"LEFT" | "RIGHT" | undefined>>;
};

export default function FilterBar({
  filterOpen,
  subcategory,
  categoryIndex,

  sort,
  category,

  setFilterOpen,
}: Props) {
  const { isScrollDown } = useScrollYContext();

  return (
    <div
      className={`z-10 text-sm border-t bg-white border-[#ededed] ease-in duration-100 sticky ${
        isScrollDown ? "top-[113px]" : "top-[153px]"
      }`}
    >
      <button
        className={`w-1/2 py-3.5 text-start px-4 border-b border-[#ededed] ${
          filterOpen === "LEFT" && "font-bold text-[#ed554d]"
        }`}
        onClick={() => {
          filterOpen === "LEFT"
            ? setFilterOpen(undefined)
            : setFilterOpen("LEFT");
        }}
      >
        <div className="flex justify-between items-center">
          <span>{subcategory} (171)</span>
          {!filterOpen && <DropDownIcon className="w-4 h-4" />}
          {filterOpen && <DropUpIcon className="w-4 h-4" />}
        </div>
      </button>
      <button
        className={`w-1/2 py-3.5 text-start px-4 border-b border-[#ededed] ${
          filterOpen === "RIGHT" && "font-bold text-[#ed554d]"
        }`}
        onClick={() => {
          filterOpen === "RIGHT"
            ? setFilterOpen(undefined)
            : setFilterOpen("RIGHT");
        }}
      >
        <div className="flex justify-between items-center">
          <span>{sortItemList.find((item) => item.value === sort)?.name}</span>
          {!filterOpen && <DropDownIcon className="w-4 h-4" />}
          {filterOpen && <DropUpIcon className="w-4 h-4" />}
        </div>
      </button>
      {filterOpen && (
        <div className="py-3 px-4 bg-white w-full absolute">
          <ul className="flex flex-col items-center justify-center">
            {filterOpen === "LEFT" &&
              subcategories[category].map((item, i) => (
                <Link
                  key={i}
                  className={`py-3.5 cursor-pointer ${
                    subcategory === item && "underline font-bold"
                  }`}
                  href={`/home/category/category?category=${category}&subcategory=${i}`}
                >
                  {item} (171)
                </Link>
              ))}
            {filterOpen === "RIGHT" &&
              sortItemList.map((item, i) => (
                <li
                  className={`py-3.5 cursor-pointer ${
                    sort === item.value && "underline font-bold"
                  }`}
                  key={i}
                  onClick={() => {
                    setFilterOpen(undefined);
                  }}
                >
                  <Link
                    href={`/home/category?category=${category}&subcategory=${categoryIndex}&sort=${item.value}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
