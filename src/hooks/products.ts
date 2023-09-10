import { Product, SearchedProduct } from "@/customType/product";
import useSWR from "swr";

export function useProducts(path?: string) {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>(path ? `/api/products/${path}` : `/api/products`);

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

export function useSearchProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<SearchedProduct[]>("/api/products/search");

  return { products, error, isLoading };
}

export function usePreorderProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>("/api/products/preorder");

  return { products, error, isLoading };
}

export function useProductsByFilter({
  category,
  subcategory,
  sort,
}: {
  category: string;
  subcategory: number;
  sort: string;
}) {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>(
    `/api/products/category?category=${category}&subcategory=${subcategory}&sort=${sort}`
  );

  return { products, error, isLoading };
}
