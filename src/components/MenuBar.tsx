"use client";

import Link from "next/link";
import { useState } from "react";
import RedDot from "./ui/RedDot";

const menus = [
  { title: "임팩트", url: "/impact" },
  { title: "최근 본", url: "/seen" },
  { title: "홈", url: "/" },
  { title: "오픈예정", url: "/preorder" },
  { title: "마이", url: "/my/order" },
];

export default function MenuBar() {
  const [menu, setMenu] = useState("최근 본");
  return (
    <div className="border-b border-neutral-200 flex justify-around text-sm">
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
