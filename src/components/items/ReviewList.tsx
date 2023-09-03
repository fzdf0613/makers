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
    </div>
  );
}
