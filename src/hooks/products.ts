import { Product, SearchedProduct } from "@/customType/product";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

async function updateSeen(productId: string, isAdd: boolean) {
  return fetch("/api/seen", {
    method: "PUT",
    body: JSON.stringify({
      productId,
      isAdd,
    }),
  }).then((res) => res.json());
}

async function removeSeenAll() {
  return fetch("/api/seen/removeAll", {
    method: "PUT",
  }).then((res) => res.json());
}

export function useProducts(path?: string) {
  const {
    data: products,
    isLoading,
    isValidating,
    error,
  } = useSWR<Product[]>(path ? `/api/products/${path}` : `/api/products`);

  return { products, error, isLoading, isValidating };
}

export function useNewProducts() {
  const { data, isLoading, isValidating, error, size, setSize } =
    useSWRInfinite<Product[]>((pageIndex, previousPageData) => {
      // 첫 페이지
      if (pageIndex === 0 && !previousPageData) {
        return `/api/products/new`;
      }
      if (previousPageData) {
        if (!previousPageData.length) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `/api/products/new?cursor=${cursor}`;
      }
    });

  return { data, error, isLoading, size, setSize, isValidating };
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
  const { data, isLoading, isValidating, error, size, setSize } =
    useSWRInfinite<Product[]>((pageIndex, previousPageData) => {
      // 첫 페이지
      if (pageIndex === 0 && !previousPageData) {
        return `/api/products/preorder`;
      }
      if (previousPageData) {
        if (!previousPageData.length) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `/api/products/preorder?cursor=${cursor}`;
      }
    });

  return { data, error, isLoading, size, setSize, isValidating };
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
  const { data, isLoading, isValidating, error, size, setSize } =
    useSWRInfinite<Product[]>((pageIndex, previousPageData) => {
      // 첫 페이지
      if (pageIndex === 0 && !previousPageData) {
        return `/api/products/category?category=${category}&subcategory=${subcategory}&sort=${sort}`;
      }
      if (previousPageData) {
        if (!previousPageData.length) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `/api/products/category?category=${category}&subcategory=${subcategory}&sort=${sort}&cursor=${cursor}`;
      }
    });

  return { data, error, isLoading, size, setSize, isValidating };
}

export function useSeenProducts() {
  const {
    data: products,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<Product[]>("/api/products/seen");

  const removeSeenList = (targetProductId: string) => {
    if (!products) {
      return;
    }

    const updated = products.filter(
      (product) => product.id !== targetProductId
    );

    return mutate(updateSeen(targetProductId, false), {
      optimisticData: updated,
      revalidate: false,
      populateCache: false,
    });
  };

  const resetSeenList = () => {
    if (!products) {
      return;
    }

    const updated: Product[] = [];

    return mutate(removeSeenAll, {
      optimisticData: updated,
      revalidate: false,
      populateCache: false,
    });
  };

  return {
    products,
    error,
    isLoading,
    isValidating,
    removeSeenList,
    resetSeenList,
  };
}
