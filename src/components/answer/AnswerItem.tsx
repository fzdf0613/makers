"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Badge from "../ui/Badge";
import Description from "../ui/Description";
import { Inquiry } from "@/customType/inquiry";
import { useInquirys } from "@/hooks/inquirys";
import { getInquiryTimeFormat } from "@/util/date";
import ModifyButton from "../ui/ModifyButton";

type Props = {
  inquiry: Inquiry;
  tab: "answered" | "waiting";
};

export default function AnswerItem({ inquiry, tab }: Props) {
  const [openInput, setOpenInput] = useState(false);
  const { addAnswer, removeAnswer } = useInquirys(tab);
  const [text, setText] = useState(inquiry.answer || "");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!text.trim() || (inquiry.answer && inquiry.answer === text)) {
      setOpenInput(false);
      return;
    }
    addAnswer(inquiry.id, {
      text,
      createdAt: new Date().getTime(),
    });
    setOpenInput(false);
  };

  const handleModify = useCallback(() => {
    setOpenInput(true);
  }, []);

  const handleDelete = useCallback(() => {
    removeAnswer(inquiry.id);
  }, [inquiry.id, removeAnswer]);

  return (
    <div className="flex flex-col p-3.5 mb-2.5 bg-white">
      <div className="flex pb-5">
        <Image
          src={inquiry.productImage}
          alt="product-thumbnail"
          width={56}
          height={56}
        />
        <div className="text-xs ml-3.5">
          <p className="font-bold">{inquiry.productName}</p>
          <p className="mt-2.5">{getInquiryTimeFormat(inquiry.createdAt)}</p>
        </div>
      </div>
      <div className="border-y border-[#f1f1f1] pb-5 pt-4 relative">
        <Badge
          text={inquiry.answer ? "답변 완료" : "답변 대기"}
          style={inquiry.answer ? "complete" : "waiting"}
          className="w-fit"
        />
        <Description text={inquiry.text} />
        <button
          className="absolute top-4 right-[10px]"
          onClick={() => setOpenInput(true)}
        >
          {!inquiry.answer && (
            <Badge text={"답변하기"} style={"complete"} className="w-fit" />
          )}
        </button>
      </div>
      {inquiry.answer && !openInput && (
        <div className="pt-5 relative">
          <ModifyButton
            handleModify={handleModify}
            handleDelete={handleDelete}
          />
          <p className="text-sm text-[#db635d] font-bold">답변</p>
          <Description text={inquiry.answer} />
          <p className="mt-2 text-[#9b9b9b] text-xs">
            {getInquiryTimeFormat(inquiry.answeredAt!)}
          </p>
        </div>
      )}
      {openInput && (
        <div className="flex flex-col mt-4">
          <textarea
            ref={inputRef}
            value={text}
            name=""
            id=""
            rows={5}
            onChange={() => {
              setText(inputRef.current?.value || "");
            }}
            maxLength={1000}
            className="resize-none border border-neutral-200 outline-none p-2 text-sm"
          />
          <div className="self-end mt-2">
            <button className="mr-1 bg-blue" onClick={handleSubmit}>
              <Badge text={"등록"} className="w-fit mr-1" style="alert" />
            </button>
            <button
              onClick={() => {
                if (inquiry.answer) {
                  setText(inquiry.answer);
                }
                setOpenInput(false);
              }}
            >
              <Badge text={"취소"} className="w-fit" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
