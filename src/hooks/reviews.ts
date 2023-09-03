import { Review } from "@/customType/review";
import useSWR from "swr";

export function useUserReviews() {
  const { data: reviews, isLoading, error } = useSWR<Review[]>(`/api/reviews`);

  return { reviews, error, isLoading };
}

export function usePostReviews(postId: string) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useSWR<Review[]>(`/api/reviews/post/${postId}`);

  return { reviews, error, isLoading };
}
