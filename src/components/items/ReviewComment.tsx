"use client";
import { Review } from "@/customType/review";
import { useState } from "react";
import Image from "next/image";

type Props = {
  review: Review;
};

export default function ReviewComment({ review }: Props) {
  const [openImage, setOpenImage] = useState(false);
  return (
    <div className="text-sm  border-b border-[#f1f1f1] py-4 mx-4">
      <div className="text-[#9b9b9b] text-xs flex items-center gap-1.5">
        <div className="h-5 w-5 relative">
          <Image
            className="rounded-lg"
            src={review.userImage}
            alt="user-thumbnail"
            fill
          />
        </div>
        <p>{review.username}</p>
        <p>{getDateText(review.createdAt)}</p>
      </div>
      <pre className="py-2.5 whitespace-pre-wrap">{review.text}</pre>
      {review.imageUrl && (
        <button
          onClick={() => {
            setOpenImage((prev) => !prev);
          }}
          className={`h-[74px] w-[74px] relative`}
        >
          {openImage && (
            <div className="absolute inset-0 border-[3px] border-[#4a4a4a] bg-[#0000004a] z-10" />
          )}
          <Image src={review.imageUrl} alt="review-thumbnail" fill />
        </button>
      )}
      {review.imageUrl && openImage && (
        <div className="w-full aspect-square bg-[#f1f1f1] relative mt-4">
          <Image
            className="object-contain"
            src={review.imageUrl}
            alt="review-full-image"
            width={608}
            height={608}
          />
        </div>
      )}
    </div>
  );
}

function getDateText(time: number) {
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dateFormatter.format(time);
}
