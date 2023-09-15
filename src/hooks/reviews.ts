import { Review } from "@/customType/review";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export function useUserReviews() {
  const { data: reviews, isLoading, error } = useSWR<Review[]>(`/api/reviews`);

  return { reviews, error, isLoading };
}

export function usePostReviews(postId: string) {
  const { data, isLoading, isValidating, error, size, setSize } =
    useSWRInfinite<Review[]>((pageIndex, previousPageData) => {
      // 첫 페이지
      if (pageIndex === 0 && !previousPageData) {
        return `/api/reviews/post/${postId}`;
      }
      if (previousPageData) {
        if (!previousPageData.length) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `/api/reviews/post/${postId}?cursor=${cursor}`;
      }
    });

  return { data, error, isLoading, size, setSize, isValidating };
}
