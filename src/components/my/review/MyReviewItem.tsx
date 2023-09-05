"use client";
import { useState } from "react";
import Image from "next/image";
import { Review } from "@/customType/review";
import { getInquiryTimeFormat } from "@/util/date";

type Props = {
  review: Review;
};

export default function MyReviewItem({ review }: Props) {
  const [openImage, setOpenImage] = useState(false);

  return (
    <div className="px-4 flex flex-col bg-white mt-2.5 pb-2.5">
      <div className="py-4 flex items-center border-b border-[#f1f1f1]">
        <Image
          className="mr-4"
          src={review.productImage}
          width={74}
          height={74}
          alt="product-thumbnail"
        />
        <div className="text-xs">
          <strong className="font-[500]">{review.productName}</strong>
          <p className="text-[#9b9b9b]">
            {getInquiryTimeFormat(review.createdAt)}
          </p>
        </div>
      </div>
      <div className="py-4">
        <pre className="text-sm whitespace-pre-wrap">{review.text}</pre>
      </div>
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
      {openImage && (
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
