import { Product } from "@/customType/product";
import useSWR from "swr";

export function useProduct(productId: string) {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR<Product>(`/api/product/${productId}`);

  return { product, error, isLoading };
}

export function useQuickLinkProduct(category: string) {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR<Product>(`/api/product/quicklink/${category}`);

  return { product, error, isLoading };
}
