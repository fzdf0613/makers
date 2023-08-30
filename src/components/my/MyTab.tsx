"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const myTabs = [
  { name: "좋아요", url: "/my/like" },
  { name: "주문 내역", url: "/my/order" },
  { name: "후기 내역", url: "/my/review" },
  { name: "문의 내역", url: "/my/qna" },
];

const beforeStyle =
  "before:content-[''] before:inline-block before:h-[11px] before:w-[1px] before:bg-[#d3d3d3]";

export default function MyTab() {
  const pathName = usePathname();

  return (
    <div className="mt-[95px] h-[50px] w-full bg-[#f6f6f6]">
      <ul className="h-full text-sm flex items-center justify-center">
        {myTabs.map((item, i) => (
          <li key={i} className={i > 0 ? beforeStyle : ""}>
            <Link
              className={`px-4 ${
                pathName.startsWith(item.url) ? "font-bold" : null
              }`}
              href={item.url}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
