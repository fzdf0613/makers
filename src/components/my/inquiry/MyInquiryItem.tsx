import Badge from "@/components/ui/Badge";
import Description from "@/components/ui/Description";
import Image from "next/image";

const text = `고객님 안녕하세요. 주식회사 바다마음입니다. 
먼저 저희 제품에 관심주셔서 진심으로 감사드립니다. 
  
문의주신 제품은 소금 등 별도 첨가물 없이 두 번 구운 곱창김이오니, 이점 구매에 참고 부탁드립니다:)
  
기타 문의사항은 언제든지 문의주세요. 감사합니다!`;

export default function MyInquiryItem() {
  return (
    <div className="flex flex-col p-3.5 mb-2.5 bg-white">
      <div className="flex pb-5">
        <Image
          src="/images/defaultAvatar.png"
          alt="product-thumbnail"
          width={56}
          height={56}
        />
        <div className="text-xs ml-3.5">
          <p className="font-bold">바다마음 먹기 좋게 잘라 두번 구운 곱창김</p>
          <p className="mt-2.5">2023-08-31 00:59:47</p>
        </div>
      </div>
      <div className="border-y border-[#f1f1f1] pb-5 pt-4">
        <Badge text="답변 완료" style="complete" className="w-fit" />
        <Description text="비린맛 안나게 짭짤한 것을 좋아하는데, 김의 간이 싱겁나요?" />
      </div>
      <div className="pt-5">
        <p className="text-sm text-[#db635d] font-bold">답변</p>
        <Description text={text} />
        <p className="mt-2 text-[#9b9b9b] text-xs">2023-08-31 00:59:47</p>
      </div>
    </div>
  );
}
