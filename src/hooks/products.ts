import { Product } from "@/customType/product";
import useSWR from "swr";

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>("/api/products");

  return { products, error, isLoading };
}

export function useNewProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>("/api/products/new");

  return { products, error, isLoading };
}
