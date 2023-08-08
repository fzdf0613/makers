import LikeIcon from "@/components/ui/icons/LikeIcon";
import Image from "next/image";

export default function ItemPage() {
  return (
    <div className="w-full">
      <div className="w-full h-[460px] relative bg-blue-200 ">
        <Image
          src="/images/defaultAvatar.png"
          alt="product"
          fill
          className="bg-blue-200"
        />
      </div>
      <section className="border-b border-t border-neutral-200 rounded-t-2xl p-5 -translate-y-[10px] bg-white">
        {/* 제품명 */}
        <h2 className="text-md font-semibold">
          카르노바 지중해 과일이 씹히는, 대체당 프리저브잼
          (딸기/복숭아/살구/블루베리)
        </h2>
        {/* 가격 */}
        <div className="flex justify-between pt-[10px]">
          <h3>
            <strong className="text-xl">8500</strong>
            <span className="text-sm">원</span>
          </h3>
          <button className="text-neutral-400">
            <LikeIcon />
          </button>
        </div>
      </section>
      <section className="pt-[30px] px-4">
        <div className="flex justify-between">
          <span className="text-md font-bold">598명 주문중</span>
          <span className="text-[13px] font-semibold">수량 3,520</span>
        </div>
        {/* 프로그레스 바 */}
        <div className="w-full h-1 bg-neutral-200 relative my-1">
          <div className="w-2/5 h-1 bg-[#ED554D] absoulte left-0 top-0"></div>
        </div>
        <div className="flex justify-between text-[13px] text-neutral-400">
          <span className="">최소 수량 1</span>
          <span>누적주문 598</span>
        </div>
      </section>
      <section className="py-6 px-4  flex flex-col gap-4">
        <div className="text-[13px]">
          <p className="w-[78px] inline-block">주문 기간</p>
          <strong className="font-bold">주문 마감 8일전</strong>
        </div>
        <div className="text-[13px]">
          <p className="w-[78px] inline-block">배송비</p>
          <strong className="font-bold">배송비 3,000원</strong>
        </div>
      </section>
      {/* 본문 */}
      <div>
        {/* 내비 */}
        <div className="text-sm">
          <ul className="h-[57px] flex justify-around border-y border-neutral-200">
            <li className="font-bold pt-[25px] after:h-[3px] after:w-full after:bg-black after:inline-block after:content-[''] after:-translate-y-[3px]">
              상세정보
            </li>
            <li className="pt-[25px]">구매후기(50)</li>
            <li className="pt-[25px]">제품문의(14)</li>
          </ul>
        </div>
        {/* 앵커 */}
        <div className="h-16 flex gap-2 py-3 px-4">
          <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
            요약
          </div>
          <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
            스토리
          </div>
          <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
            보관법
          </div>
        </div>
        {/* 본문 내용 */}
        <div className="h-[1000px] bg-yellow-50">본문</div>
      </div>
      {/* 푸터 */}
      <div className="w-full h-[96px] pt-2 pb-8 fixed bottom-0 right-0 bg-white">
        <div className="mx-auto w-full h-full flex justify-between max-w-[640px] text-md font-bold text-white px-4">
          <div className="bg-[#1a1a1a] rounded-md w-[28%] flex justify-center items-center">
            선물하기
          </div>
          <div className="bg-[#ed554d] rounded-md ml-2 w-[72%] flex justify-center items-center">
            주문하기
          </div>
        </div>
      </div>
    </div>
  );
}
