"use client";
import MyLikeItem from "@/components/my/like/MyLikeItem";
import { useProducts } from "@/hooks/products";

export default function MyLikePage() {
  const { products } = useProducts("like");
  return (
    <div className="grid grid-cols-2 p-4 gap-2">
      {products &&
        products.map((product) => (
          <MyLikeItem key={product.id} product={product} />
        ))}
    </div>
  );
}
