import Button from "../ui/Button";

type Props = {
  handleCancelClick: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  text: string;
};

export default function InquiryWriteHeader({
  handleCancelClick,
  handleSubmit,
  isSubmitting,
  text,
}: Props) {
  return (
    <header className=" h-[55px] max-w-[640px] bg-[#db635d] flex justify-between text-white items-center px-4">
      <Button
        className="font-bold border-none bg-[#d2453e] text-[#e09a9a]"
        onClick={handleCancelClick}
      >
        취소
      </Button>
      제품 문의
      <Button
        className={`font-bold border-none bg-[#d2453e] ${
          (text.length === 0 || isSubmitting) && "text-[#e09a9a]"
        }`}
        onClick={handleSubmit}
        disabled={text.length === 0 || isSubmitting}
      >
        확인
      </Button>
    </header>
  );
}
