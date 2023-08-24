import Description from "@/components/ui/Description";
import Feature from "@/components/ui/Feature";
import Image from "next/image";
import ShareIcon from "../ui/icons/ShareIcon";
import AlarmIcon from "../ui/icons/AlarmIcon";

export default function PreorderItem() {
  return (
    <div className="mt-12">
      <div className=" px-4 w-full">
        <div className="w-full pt-[66.217%] relative">
          <div className="absolute top-[11px] left-[12px] z-[3]">
            <p className="text-xs font-semibold text-white">
              [경남화훼농가돕기] 김해에서 자란 못난이 꽃
            </p>
            <p className="text-xs font-semibold text-white">13,900원</p>
          </div>

          <Image
            className="object-fill"
            src="/images/defaultAvatar.png"
            alt="preorder-item"
            fill
          />
        </div>
        <div className="my-4">
          <strong className="font-bold text-xl mt-2">
            상처 없는 삶은 없다
          </strong>
          <Description text="꽃도 마찬가지입니다. 농부의 땀방울과 정성 어린 손길로 피어났지만 작은 얼룩과 기준에서 벗어난 외관을 이유로 선택받지 못한 꽃이 있죠. 살짝만 다듬으면 집에서 감상하기에는 부족함이 없는 아름다움, 경매 당일 유찰된 꽃을 들여보세요. 💐 제가버치가 우리 화훼 농가를 응원합니다." />
        </div>
        <Feature text="806명이 기다려요" />
        <div className="flex border border-[#e7e7e7] h-12 mt-5">
          <button className="w-[55px] text-center">
            <ShareIcon className="w-5 h-5 m-auto" />
          </button>
          <button className="font-bold text-sm border-[#e7e7e7] border-l grow flex items-center justify-center">
            <AlarmIcon className="w-5 h-5 mr-1" />
            톡으로 알림받기
          </button>
        </div>
      </div>
    </div>
  );
}
