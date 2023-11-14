"use client";
import { ForwardedRef, useRef } from "react";
type Props = {
  tab: "상세정보" | "구매후기" | "제품문의";
  setTab: React.Dispatch<
    React.SetStateAction<"상세정보" | "구매후기" | "제품문의">
  >;
  navRef: ForwardedRef<HTMLDivElement>;
  reviewCount: number;
  inquiryCount: number;
};

const focusStyle =
  "font-bold after:h-[3px] after:w-full after:bg-black after:inline-block after:content-[''] after:-translate-y-[3px]";

export default function ItemNavBar({
  tab,
  setTab,
  navRef,
  reviewCount,
  inquiryCount,
}: Props) {
  const navBarRef = useRef<HTMLDivElement>(null);

  const handleClick = (tabName: "상세정보" | "구매후기" | "제품문의") => {
    if (tabName !== tab) {
      const el = document.getElementById("nav-scroll-target");
      if (el) {
        window.scrollTo(
          0,
          window.scrollY + el.getBoundingClientRect().top - 55
        );
      }
      setTab(tabName);
    }
  };
  return (
    <div className={`text-sm sticky top-[53px] bg-white z-[4]`} ref={navBarRef}>
      <ul className="h-[57px] flex justify-around border-y border-neutral-200">
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "상세정보" ? focusStyle : ""
          }`}
          // onClick={() => {
          //   setTab("상세정보");
          // }}
          onClick={() => handleClick("상세정보")}
        >
          상세정보
        </li>
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "구매후기" ? focusStyle : ""
          }`}
          // onClick={() => {
          //   const el = document.getElementById("nav-scroll-target");
          //   el?.scrollIntoView();
          //   setTab("구매후기");
          // }}
          onClick={() => handleClick("구매후기")}
        >
          구매후기({reviewCount})
        </li>
        <li
          className={`cursor-pointer pt-[25px] ${
            tab === "제품문의" ? focusStyle : ""
          }`}
          // onClick={() => {
          //   setTab("제품문의");
          // }}
          onClick={() => handleClick("제품문의")}
        >
          제품문의({inquiryCount})
        </li>
      </ul>
    </div>
  );
}
