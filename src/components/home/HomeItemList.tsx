"use client";
import React from "react";
import { useProducts } from "@/hooks/products";
import HomeItem from "./HomeItem";

export default function HomeItemList() {
  const { products } = useProducts();
  return (
    <section>
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
