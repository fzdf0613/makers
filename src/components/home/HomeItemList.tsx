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
          {products.map((item) => (
            <li key={item.id}>
              <HomeItem product={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
