"use client";
import DropDownIcon from "../ui/icons/DropDownIcon";
import InquiryComment from "./InquiryComment";
import { usePostInquirys } from "@/hooks/inquirys";

type Props = {
  inquiryCount: number;
  postId: string;
};

export default function InquiryList({ postId, inquiryCount }: Props) {
  const { data, error, isLoading, isValidating, size, setSize } =
    usePostInquirys(postId);

  return (
    <div>
      {data?.map((inquirys) => {
        return inquirys.map((inquiry) => (
          <InquiryComment key={inquiry.id} inquiry={inquiry} />
        ));
      })}
      {Math.ceil(inquiryCount / 10) > size && (
        <button
          className="bg-[#f9f9f9] py-3.5 text-[13px] flex justify-center items-center w-full border-t border-[#e4e4e4]"
          onClick={() => setSize((prev) => prev + 1)}
        >
          제품 문의 더보기
          <DropDownIcon className="ml-2" />
        </button>
      )}
      {size === 1 && data?.at(-1)?.length === 0 && (
        <div className="py-6 flex items-center justify-center text-base">
          등록된 제품 문의가 없습니다.
        </div>
      )}
    </div>
  );
}
