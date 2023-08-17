"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Portal from "@/components/ui/Portal";
import ConfirmModal from "@/components/ConfirmModal";

export default function InquriyWritePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCancelClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="w-full max-w-[640px]">
      <header className=" h-[55px] max-w-[640px] bg-[#db635d] flex justify-between text-white items-center px-4">
        <Button
          className="font-bold border-none bg-[#d2453e] text-[#e09a9a]"
          onClick={handleCancelClick}
        >
          취소
        </Button>
        제품 문의
        <Button className="font-bold border-none bg-[#d2453e]">확인</Button>
      </header>
      <main>
        <section className="px-3.5 mb-[30px]">
          <div className="flex my-3">
            <div className="w-14 h-14 relative">
              <Image
                src="/images/defaultAvatar.png"
                alt="product-thumbnail"
                fill
              />
            </div>
            <p className="text-xs ml-2">
              뉴트라라이프 프로폴리스 캔디 1+1 박스, 추가 캔디 10개 증정 (총
              70개입)
            </p>
          </div>
          <p className="font-bold text-[15px] my-3">문의내용</p>
          <div className="p-3 border border-[#f1f1f1] relative">
            <textarea
              className="resize-none w-full mb-[25px] outline-none focus:outline-blue-200 focus:outline-4 ease-in duration-200"
              placeholder="문의 내용을 상세하게 입력해주세요."
              rows={5}
              max-rows={5}
              maxLength={1000}
            ></textarea>
            <span className="text-[#bdbdbd] text-[13px] absolute bottom-[10px] right-[10px]">
              0 / 최대 1,000자
            </span>
          </div>
          <ul className="text-xs mt-4 list-disc flex flex-col gap-3 mx-3.5">
            <li className="">
              결제/배송/주문취소/교환/환불 등의 관련 문의는 1:1문의하기에서 작성
              가능합니다.
            </li>
            <li>
              작성하신 문의 글에 제작사로부터 답변이 등록되면 카카오메이커스
              채널로 안내 드리겠습니다.
            </li>
            <li>
              비방, 광고 등 제품과 관련 없는 문의는 강제 삭제 될 수 있음을
              알려드립니다.
            </li>
          </ul>
        </section>
        {modalOpen && (
          <Portal>
            <ConfirmModal closeModal={() => setModalOpen(false)} />
          </Portal>
        )}
      </main>
    </div>
  );
}
