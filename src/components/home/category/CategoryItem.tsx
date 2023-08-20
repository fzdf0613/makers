import Image from "next/image";
import Feature from "@/components/ui/Feature";

export default function CategoryItem() {
  return (
    <div className="mb-10 cursor-pointer">
      <div className="w-full relative pb-[125%]">
        <Image
          className="object-cover"
          src="/images/defaultAvatar.png"
          alt="product"
          fill
        />
      </div>
      <h3 className="text-sm mt-2">
        [뷰티위크] 라운드랩 1025 독도 클렌징티슈 30매 2+1
      </h3>
      <div className="text-[13px] text-[#6c6c6c] py-1">9,990원</div>
      <Feature text="391명이 주문중" />
    </div>
  );
}
