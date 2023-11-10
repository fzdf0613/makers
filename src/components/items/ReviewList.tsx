"use client";
import DropDownIcon from "../ui/icons/DropDownIcon";
import { usePostReviews } from "@/hooks/reviews";
import ReviewComment from "./ReviewComment";

type Props = {
  reviewCount: number;
  postId: string;
};

export default function ReviewList({ postId, reviewCount }: Props) {
  const { data, error, isLoading, isValidating, size, setSize } =
    usePostReviews(postId);
  return (
    <div>
      {data?.map((reviews) => {
        return reviews.map((review) => (
          <ReviewComment key={review.id} review={review} />
        ));
      })}
      {Math.ceil(reviewCount / 10) > size && (
        <button
          className="bg-[#f9f9f9] py-3.5 text-[13px] flex justify-center items-center w-full border-t border-[#e4e4e4]"
          onClick={() => setSize((prev) => prev + 1)}
        >
          {`구매 후기 더보기 (${size}/${Math.ceil(reviewCount / 10)})`}
          <DropDownIcon className="ml-2" />
        </button>
      )}
      {size === 1 && data?.at(-1)?.length === 0 && (
        <div className="py-6 flex items-center justify-center text-base">
          등록된 구매 후기가 없습니다.
        </div>
      )}
    </div>
  );
}
