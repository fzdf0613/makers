"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import RedDot from "./ui/RedDot";

import { useScrollYContext } from "@/context/ScrollYContext";
import { usePathname } from "next/navigation";

const menus = [
  { title: "임팩트", url: "/impact" },
  { title: "최근 본", url: "/seen" },
  { title: "홈", url: "/" },
  { title: "오픈예정", url: "/preorder" },
  { title: "마이", url: "/my/order" },
];

export default function MenuBar() {
  const pathName = usePathname();
  const [menu, setMenu] = useState("");
  const { isScrollDown } = useScrollYContext();

  useLayoutEffect(() => {
    if (!pathName) {
      return;
    }
    if (pathName.startsWith("/my")) {
      setMenu("마이");
      return;
    }
    setMenu(menus.find((item) => item.url === pathName)!.title);
  }, [pathName]);

  return (
    <div
      className={`relative h-[40px] bg-white border-b border-neutral-200 flex justify-around text-sm ease-in duration-100 -z-10 ${
        isScrollDown ? "my-[-40px]" : ""
      }`}
    >
      {menus.map((item, index) => (
        <Link
          href={item.url}
          key={index}
          className={`p-2 -mb-[1px] relative
            ${menu === item.title && "border-b-[2px] border-black"}
            `}
        >
          {item.title}
          <RedDot />
        </Link>
      ))}
    </div>
  );
}
