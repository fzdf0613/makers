"use client";
import useScrollYHandler from "@/hooks/scrollYHandler";
import { Dispatch, SetStateAction } from "react";
import DropDownIcon from "@/components/ui/icons/DropDownIcon";
import DropUpIcon from "@/components/ui/icons/DropUpIcon";
import { subcategories } from "@/constants/categories";
import { CategoryName } from "@/customType/category";

type Props = {
  filterOpen: "LEFT" | "RIGHT" | undefined;
  category: CategoryName;
  subcategory: string;
  filter: string;
  setFilterOpen: Dispatch<SetStateAction<"LEFT" | "RIGHT" | undefined>>;
  setFilter: Dispatch<SetStateAction<string>>;
  setSubcategory: Dispatch<SetStateAction<string>>;
};

export default function FilterBar({
  filterOpen,
  subcategory,
  filter,
  category,
  setSubcategory,
  setFilter,
  setFilterOpen,
}: Props) {
  const { isScrolled: isScrollDown } = useScrollYHandler();

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
          <span>{filter}</span>
          {!filterOpen && <DropDownIcon className="w-4 h-4" />}
          {filterOpen && <DropUpIcon className="w-4 h-4" />}
        </div>
      </button>
      {filterOpen && (
        <div className="py-3 px-4 bg-white w-full absolute">
          <ul className="flex flex-col items-center justify-center">
            {filterOpen === "LEFT" &&
              subcategories[category].map((item, i) => (
                <li
                  key={i}
                  className={`py-3.5 cursor-pointer ${
                    subcategory === item && "underline font-bold"
                  }`}
                  onClick={() => {
                    setSubcategory(item);
                    setFilterOpen(undefined);
                  }}
                >
                  {item} (171)
                </li>
              ))}
            {filterOpen === "RIGHT" &&
              ["최신순", "마감 임박 순", "주문 많은 순"].map((item, i) => (
                <li
                  className={`py-3.5 cursor-pointer ${
                    filter === item && "underline font-bold"
                  }`}
                  key={i}
                  onClick={() => {
                    setFilter(item);
                    setFilterOpen(undefined);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
