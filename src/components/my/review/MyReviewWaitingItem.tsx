import { Order } from "@/customType/order";
import { getInquiryTimeFormat } from "@/util/date";
import Image from "next/image";
import Link from "next/link";

type Props = {
  order: Order;
};

export default function MyReviewWaitingItem({ order }: Props) {
  return (
    <div className="py-3 px-4 flex bg-white items-center">
      <Image
        className="mr-4"
        src={"/images/defaultAvatar.png"}
        width={64}
        height={64}
        alt="product-thumbnail"
      />
      <div className="grow">
        <strong>{order.productName}</strong>
        <p className="pt-[5px] text-xs text-[#9b9b9b]">
          {getInquiryTimeFormat(order.orderedAt)}
        </p>
      </div>
      <div className="bg-[#fed800] text-[13px] py-3 w-[88px] text-center font-[700]">
        후기 작성
      </div>
    </div>
  );
}
