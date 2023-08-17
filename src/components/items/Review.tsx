import ReviewComment from "./ReviewComment";
import { BiChevronRight } from "react-icons/bi";

export default function Review() {
  return (
    <div className="bg-white h-[1000px]">
      <div className=" border-b border-[#f1f1f1] py-4">
        <p className="text-[13px] text-center relative">
          {"구매후기는 "}
          <span className="text-[#6c80e4] font-bold">후기내역 </span>
          에서 작성하실 수 있습니다.
          <BiChevronRight className="absolute right-5 top-0 w-5 h-5" />
        </p>
      </div>
      <h4 className="font-bold py-4 text-sm">구매후기 1781</h4>
      <ReviewComment />
    </div>
  );
}
