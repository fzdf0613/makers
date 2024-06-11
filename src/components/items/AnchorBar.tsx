"use client";
import { useState, useEffect } from "react";
import { useScrollYContext } from "@/context/ScrollYContext";

type Props = {
  anchors: { name: string; id: string }[];
};

export default function AnchorBar({ anchors }: Props) {
  const { Y, isScrollDown } = useScrollYContext();
  const [activeAnchor, setActiveAnchor] = useState<string>("");

  useEffect(() => {
    for (let i = 0; i < anchors.length; i++) {
      const anchor = document.querySelector(`#${anchors[i].id}`);
      if (!anchor) {
        return;
      }
      const offset = anchor.id === "summary" ? 111 : 121;
      const anchorY = anchor.getBoundingClientRect().top + Y - offset;
      if (i == 0 && Y < anchorY - 10) {
        setActiveAnchor("");
        return;
      }
      if (Y < anchorY - 10) {
        setActiveAnchor(anchors[i - 1].name);
        return;
      }
    }
    setActiveAnchor(anchors[anchors.length - 1].name);
  }, [Y, anchors]);

  return (
    <div
      id="anchorList"
      className={`h-16 flex gap-2 py-3 px-4 sticky bg-white z-[5] ${
        isScrollDown ? "top-[53px]" : "top-[110px]"
      } ease-in duration-100`}
    >
      {anchors.map((anchor, i) => (
        <div
          key={i}
          className={`
          ${activeAnchor === anchor.name ? "bg-[#1a1a1a] text-white" : ""}
           cursor-pointer px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center`}
          onClick={() => {
            const el = document.querySelector(`#${anchor.id}`);
            if (!el) {
              return;
            }
            const offset = anchor.id === "summary" ? 111 : 121;
            window.scrollTo({
              top: el.getBoundingClientRect().top + window.scrollY - offset,
              behavior: "smooth",
            });
          }}
        >
          {anchor.name}
        </div>
      ))}
    </div>
  );
}
