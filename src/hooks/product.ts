import { Product } from "@/customType/product";
import useSWR from "swr";

export default function useProduct(productId: string) {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR<Product>(`/api/product/${productId}`);

  return { product, error, isLoading };
}
