"use client";
import { Ref } from "react";
type Props = {
  tab: "상세정보" | "구매후기" | "제품문의";
  setTab: React.Dispatch<
    React.SetStateAction<"상세정보" | "구매후기" | "제품문의">
  >;
  navRef: Ref<HTMLDivElement>;
  isOverlap: boolean;
  reviewCount: number;
  inquiryCount: number;
};

const focusStyle =
  "font-bold after:h-[3px] after:w-full after:bg-black after:inline-block after:content-[''] after:-translate-y-[3px]";

export default function ItemNavBar({
  tab,
  setTab,
  navRef,
  isOverlap,
  reviewCount,
  inquiryCount,
}: Props) {
  return (
    <div
      className={`text-sm sticky top-[53px] bg-white ${
        isOverlap ? "z-[4]" : "z-[5]"
      }`}
      ref={navRef}
    >
      <ul className="h-[57px] flex justify-around border-y border-neutral-200">
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "상세정보" ? focusStyle : ""
          }`}
          onClick={() => {
            setTab("상세정보");
          }}
        >
          상세정보
        </li>
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "구매후기" ? focusStyle : ""
          }`}
          onClick={() => {
            setTab("구매후기");
          }}
        >
          구매후기({reviewCount})
        </li>
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "제품문의" ? focusStyle : ""
          }`}
          onClick={() => {
            setTab("제품문의");
          }}
        >
          제품문의({inquiryCount})
        </li>
      </ul>
    </div>
  );
}
