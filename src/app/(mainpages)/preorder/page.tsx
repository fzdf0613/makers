import PreorderItem from "@/components/preorder/PreorderItem";
import Heading from "@/components/ui/Heading";

export default function PreorderPage() {
  return (
    <>
      <div className="px-4 pt-[135px]">
        <Heading text="곧 오픈합니다" />
        <p className="mt-[9px] text-md">
          기다려지는 제품을 찾으셨나요?
          <br />
          주문이 시작되면 알려드릴게요.
        </p>
      </div>
      <div className="mb-10">
        <PreorderItem />
        <PreorderItem />
        <PreorderItem />
      </div>
    </>
  );
}
