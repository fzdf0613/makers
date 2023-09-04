import { Inquiry } from "@/customType/inquiry";

type Props = {
  inquiry: Inquiry;
};

export default function InquiryComment({ inquiry }: Props) {
  return (
    <div className="py-4 px-[14px] text-sm w-full border-b border-[#f1f1f1]">
      <p className="whitespace-pre-wrap">{inquiry.text}</p>
      <div className="text-[#9b9b9b] text-xs flex mt-2">
        <p>{inquiry.username}</p>
        <p className="pl-2">{getTimeText(inquiry.createdAt)}</p>
      </div>
      {inquiry.answer && (
        <div className="mt-4">
          <p className="text-[#db635d] font-bold pb-2">답변</p>
          <p className="whitespace-pre-wrap">{inquiry.answer}</p>
        </div>
      )}
    </div>
  );
}

function getTimeText(time: number) {
  const date = new Date(time);
  const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const splitted = dateFormatter.format(date).split(". ");
  return `${splitted[0]}-${splitted[1]}-${splitted[2]}  ${splitted[3]}`;
}
