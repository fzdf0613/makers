import { Product } from "@/customType/product";
import useSWR from "swr";

export default function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>("/api/products");

  return { products, error, isLoading };
}
