"use client";
import ReviewList from "./ReviewList";
import { useRouter } from "next/navigation";
import RightArrowIcon from "../ui/icons/RightArrowIcon";

type Props = {
  reviewCount: number;
  postId: string;
};

export default function ReviewContainer({ reviewCount, postId }: Props) {
  const router = useRouter();
  return (
    <div className="bg-white h-[1000px]">
      <div
        className=" border-b border-[#f1f1f1] py-4 cursor-pointer"
        onClick={() => {
          router.push("/my/review?location=waiting");
        }}
      >
        <div className="text-[13px] text-center relative">
          {"구매후기는 "}
          <span className="text-[#6c80e4] font-bold">후기내역 </span>
          에서 작성하실 수 있습니다.
          <RightArrowIcon className="absolute right-5 top-0 w-5 h-5" />
        </div>
      </div>
      <h4 className="font-bold py-4 text-sm mx-4">
        구매후기 {reviewCount.toLocaleString()}
      </h4>
      <ReviewList postId={postId} reviewCount={reviewCount} />
    </div>
  );
}
