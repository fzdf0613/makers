"use client";
import { useUserInquirys } from "@/hooks/inquirys";
import MyInquiryItem from "./MyInquiryItem";

export default function MyInquiryList() {
  const { inquirys } = useUserInquirys();
  return (
    <div className="bg-[#ededed] flex flex-col">
      {inquirys &&
        inquirys.map((inquiry) => (
          <MyInquiryItem key={inquiry.id} inquiry={inquiry} />
        ))}
      {!inquirys && (
        <div className="text-[15px] text-[#9b9b9b] h-[calc(100vh - 200px)] flex items-center justify-center">
          문의하신 내역이 없습니다.
        </div>
      )}
    </div>
  );
}
