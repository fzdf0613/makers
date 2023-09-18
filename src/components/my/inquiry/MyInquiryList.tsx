"use client";
import { useUserInquirys } from "@/hooks/inquirys";
import MyInquiryItem from "./MyInquiryItem";
import { MoonLoader } from "react-spinners";

export default function MyInquiryList() {
  const { inquirys, isValidating } = useUserInquirys();
  return (
    <div
      className={`${isValidating ? "bg-white" : "bg-[#ededed]"} flex flex-col`}
    >
      {!isValidating &&
        inquirys?.map((inquiry) => (
          <MyInquiryItem key={inquiry.id} inquiry={inquiry} />
        ))}
      {!isValidating && inquirys?.length === 0 && (
        <div className="text-[15px] text-[#9b9b9b] h-screen] flex items-center justify-center">
          문의하신 내역이 없습니다.
        </div>
      )}
      {isValidating && (
        <div className="h-[375px] flex justify-center items-center">
          <MoonLoader color="#9b9b9b" speedMultiplier={0.7} />
        </div>
      )}
    </div>
  );
}
