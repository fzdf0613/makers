import Image from "next/image";

export default function ReviewComment() {
  return (
    <div className="text-sm  border-b border-[#f1f1f1] py-4">
      <div className="text-[#9b9b9b] text-xs flex items-center gap-1.5">
        <div className="h-5 w-5 relative">
          <Image
            className="rounded-lg"
            src="/images/defaultAvatar.png"
            alt="user-thumbnail"
            fill
          />
        </div>
        <p>유저</p>
        <p className="">2023-08-14</p>
      </div>
      <pre className="py-2.5 whitespace-pre-wrap">
        5월은 선물의 달로, 주변분들께 가볍게 드리기 좋은 선물을 찾다가 주문을
        했어요~ 캔디를 먹어보신 분중에 맛없다, 너무 맵다… 하시는 분들이 있어
        고민하다 주문했는데 제 입맛에는 너무 달지 않고 딱!! 좋았어요(아이들
        입맛에는 매울 수 있음) 이었어요. 선물 받고 맛보신 분들 반응도 나쁘지
        않아 부담스럽지않은 선물로도 굿이었습니다~!!
      </pre>
      <div className="h-[74px] w-[74px] relative">
        <Image src="/images/defaultAvatar.png" alt="user-thumbnail" fill />
      </div>
    </div>
  );
}
