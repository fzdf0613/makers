"use client";
import { usePostReviews } from "@/hooks/reviews";
import ReviewComment from "./ReviewComment";

type Props = { postId: string };

export default function ReviewList({ postId }: Props) {
  const { reviews } = usePostReviews(postId);

  return (
    <div>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <ReviewComment key={review.id} review={review} />
          ))}
        </ul>
      )}
      {!reviews && (
        <div className="py-6 flex items-center justify-center text-base">
          등록된 구매 후기가 없습니다.
        </div>
      )}
    </div>
  );
}
