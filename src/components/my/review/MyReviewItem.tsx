import Image from "next/image";

export default function MyReviewItem() {
  return (
    <div className="px-4 flex flex-col bg-white mt-2.5">
      <div className="py-4 flex items-center border-b border-[#f1f1f1]">
        <Image
          className="mr-4"
          src="/images/defaultAvatar.png"
          width={74}
          height={74}
          alt="product-thumbnail"
        />
        <div className="text-xs">
          <strong className="font-[500]">
            경주 황리단길 맛집, 프프프베이커리 달콤한 버터
            스프레드(허니버터/얼그레이)
          </strong>
          <p className="text-[#9b9b9b]">2023-08-19 21:30:58</p>
        </div>
      </div>
      <div className="py-4">
        <pre className="text-sm">맛있어요</pre>
      </div>
    </div>
  );
}
