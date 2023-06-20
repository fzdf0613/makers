"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import RedDot from "./ui/RedDot";

const menus = [
  { title: "임팩트", url: "/impact" },
  { title: "최근 본", url: "/seen" },
  { title: "홈", url: "/" },
  { title: "오픈예정", url: "/preorder" },
  { title: "마이", url: "/my/order" },
];

export default function MenuBar() {
  const [Y, setY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [throttle, setThrottle] = useState(false);
  const [menu, setMenu] = useState("최근 본");
  useEffect(() => {
    const handleScroll = () => {
      if (throttle) {
        return;
      }
      setThrottle(true);
      setTimeout(() => {
        const currentY = window.scrollY;
        if (currentY - Y < 0) {
          // 스크롤 올렸을 때
          setIsScrolled(false);
        } else {
          //스크롤 내렸을 때
          if (currentY >= 40) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }
        setY(currentY);
        setThrottle(false);
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [Y]);

  return (
    <div
      className={`relative h-[40px] bg-white border-b border-neutral-200 flex justify-around text-sm ease-in duration-100 -z-10 ${
        isScrolled ? "my-[-40px]" : ""
      }`}
    >
      {menus.map((item, index) => (
        <Link
          href={item.url}
          key={index}
          className={`p-2 -mb-[1px] relative
            ${menu === item.title && "border-b-[2px] border-black"}
            `}
          onClick={() => {
            setMenu(item.title);
          }}
        >
          {item.title}
          <RedDot />
        </Link>
      ))}
    </div>
  );
}
