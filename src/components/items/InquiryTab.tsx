import Link from "next/link";
import InquiryComment from "./InquiryComment";

type Props = {
  productId: string;
};

export default function InquiryTab({ productId }: Props) {
  return (
    <div className="h-[2000px] bg-white w-full flex flex-col">
      <Link
        href={`/inquiry/write/product/${productId}`}
        className="bg-[#db635d] text-white h-[40px] m-[14px] flex items-center justify-center"
      >
        제작사에 제품 문의하기
      </Link>
      <InquiryComment />
    </div>
  );
}
