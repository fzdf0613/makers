"use client";
import { useState } from "react";

import AnswerTab from "./AnswerTab";
import AnswerItem from "./AnswerItem";
import { useInquirys } from "@/hooks/inquirys";

export default function AnswerList() {
  const [tab, setTab] = useState<"answered" | "waiting">("waiting");
  const { inquirys, isValidating, addAnswer, removeAnswer } = useInquirys(tab);

  return (
    <>
      <AnswerTab
        tab={tab}
        handleTabClick={(tabName) => {
          setTab(tabName);
        }}
      />
      <div className="bg-[#ededed] pb-2.5 flex flex-col">
        {!isValidating &&
          inquirys &&
          inquirys.length > 0 &&
          inquirys.map((inquiry) => (
            <AnswerItem key={inquiry.id} inquiry={inquiry} tab={tab} />
          ))}
        {!isValidating && inquirys && inquirys.length == 0 && (
          <div className="h-[400px] flex items-center justify-center">
            {tab === "waiting"
              ? "답변 대기중인 문의 내역이 없습니다."
              : "작성한 답변 내역이 없습니다."}
          </div>
        )}
      </div>
    </>
  );
}
