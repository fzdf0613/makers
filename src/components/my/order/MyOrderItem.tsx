import Image from "next/image";
import React from "react";

export default function MyOrderItem() {
  return (
    <div className="mt-2 flex flex-col bg-white p-4">
      <div className="pb-4 border-b-2 border-black">
        <div className="font-bold">2023. 6. 10. (토)</div>
        <span className="text-[#6c6c6c] text-[13px]">
          장바구니 번호 117265214
        </span>
      </div>
      <div className="flex py-4">
        <div className="mr-3 relative aspect-square max-w-[21.6%] w-full">
          <Image
            src="/images/defaultAvatar.png"
            alt="order-thumbnail"
            fill
            sizes="150px"
          />
        </div>
        <div>
          <div className="w-fit px-2 py-[3px] font-bold text-xs text-white bg-[#9b9b9b]">
            배송완료
          </div>
          <strong className="text-sm font-bold">
            경주 황리단길 맛집, 프프프베이커리 달콤한 버터
            스프레드(허니버터/얼그레이)
          </strong>
          <div className="text-sm">
            14,900원
            <span className="mx-2 w-[1px] h-[12px] bg-[#d4d4d4] inline-block" />
            1개
          </div>
        </div>
      </div>
      <div className="py-[10px] bg-[#ffdf00] text-[13px] flex items-center justify-center">
        후기쓰기
      </div>
    </div>
  );
}
