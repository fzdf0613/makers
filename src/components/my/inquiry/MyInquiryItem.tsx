import Badge from "@/components/ui/Badge";
import Description from "@/components/ui/Description";
import { Inquiry } from "@/customType/inquiry";
import { getInquiryTimeFormat } from "@/util/date";
import Image from "next/image";

type Props = {
  inquiry: Inquiry;
};

export default function MyInquiryItem({ inquiry }: Props) {
  return (
    <div className="flex flex-col p-3.5 mb-2.5 bg-white">
      <div className="flex pb-5">
        <Image
          src={inquiry.productImage}
          alt="product-thumbnail"
          width={56}
          height={56}
        />
        <div className="text-xs ml-3.5">
          <p className="font-bold">{inquiry.productName}</p>
          <p className="mt-2.5">{getInquiryTimeFormat(inquiry.createdAt)}</p>
        </div>
      </div>
      <div className="border-y border-[#f1f1f1] pb-5 pt-4">
        <Badge
          text={inquiry.answer ? "답변 완료" : "답변 대기"}
          style={inquiry.answer ? "complete" : "waiting"}
          className="w-fit"
        />
        <Description text={inquiry.text} />
      </div>
      {inquiry.answer && (
        <div className="pt-5">
          <p className="text-sm text-[#db635d] font-bold">답변</p>
          <Description text={getInquiryTimeFormat(inquiry.answeredAt!)} />
          <p className="mt-2 text-[#9b9b9b] text-xs">2023-08-31 00:59:47</p>
        </div>
      )}
    </div>
  );
}
