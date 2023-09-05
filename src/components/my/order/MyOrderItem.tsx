import { Order } from "@/customType/order";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  order: Order;
};

export default function MyOrderItem({ order }: Props) {
  return (
    <div className="mt-2 flex flex-col bg-white p-4">
      <div className="pb-4 border-b-2 border-black">
        <div className="font-bold">{getDateText(order.orderedAt)}</div>
        <span className="text-[#6c6c6c] text-[13px]">
          장바구니 번호 {order.orderedAt}
        </span>
      </div>
      <div className="flex py-4">
        <div className="mr-3 relative aspect-square max-w-[21.6%] w-full">
          <Image
            src={order.productImage}
            alt="order-thumbnail"
            fill
            sizes="150px"
          />
        </div>
        <div>
          <div className="w-fit px-2 py-[3px] font-bold text-xs text-white bg-[#9b9b9b] mb-2">
            배송완료
          </div>
          <strong className="text-sm font-bold">{order.productName}</strong>
          <div className="text-sm">
            {order.totalPrice.toLocaleString()}원
            <span className="mx-2 w-[1px] h-[12px] bg-[#d4d4d4] inline-block" />
            {order.count}개
          </div>
        </div>
      </div>
      {!order.hasReview && (
        <Link
          className="py-[10px] bg-[#ffdf00] text-[13px] flex items-center justify-center"
          href={`/review/write?orderId=${
            order.id
          }&returnUrl=${encodeURIComponent("/my/order")}`}
        >
          후기쓰기
        </Link>
      )}
    </div>
  );
}

function getDateText(time: number) {
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  return dateFormatter.format(time);
}
