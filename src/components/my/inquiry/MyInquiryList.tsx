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
    </div>
  );
}
