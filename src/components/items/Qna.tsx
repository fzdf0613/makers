import Button from "../ui/Button";
import QnaComment from "./QnaComment";

export default function Qna() {
  return (
    <div className="h-[2000px] bg-white w-full flex flex-col">
      <Button className="bg-[#db635d] text-white h-[40px] m-[14px]">
        제작사에 제품 문의하기
      </Button>
      <QnaComment />
    </div>
  );
}
