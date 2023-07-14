"use client";
import { categories } from "@/constants/categories";
import { useState } from "react";

export default function CategoryInputs() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].title);
  const [selectedsubCategory, setSelectedSubCategory] = useState(
    categories[0].subcategories![0]
  );
  return (
    <div className="w-full m-auto flex p-4 items-center justify-between border-b border-neutral-200">
      <span className="font-bold text-sm">카테고리</span>
      <select
        name="categories"
        id="categories"
        className="outline-none"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
      >
        {categories.map((item) => (
          <option key={item.title} value={item.title} className="p-2">
            {item.title}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <select
          name="subCategories"
          id="subCategories"
          className="outline-none"
          onChange={(e) => {
            setSelectedSubCategory(e.target.value);
          }}
        >
          {categories
            .find((item) => item.title === selectedCategory)!
            .subcategories!.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}
