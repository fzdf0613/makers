"use client";

import Link from "next/link";
import { useState } from "react";
import RedDot from "../ui/RedDot";
import Button from "../ui/Button";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const categories = [
  { title: "전체", url: "/" },
  { title: "신규", url: "/home/new" },
  { title: "여름 침구🧊", url: "/home/food" },
  { title: "푸드", url: "/home/beauty" },
  { title: "뷰티", url: "/home/life" },
  { title: "생활", url: "/home/" },
  { title: "가전", url: "/home/" },
  { title: "패션", url: "/home/" },
  { title: "하루여행🧊", url: "/home/life" },
  { title: "컬렉팅🧊", url: "/home/" },
];

export default function HomeCategoryBar() {
  const [category, setCategory] = useState("전체");
  return (
    <>
      <Swiper
        className="!py-3 !first:ml-4"
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode]}
        threshold={30}
        setWrapperSize
        touchStartForcePreventDefault
        onClick={(swiper, event) => {
          console.log("hi");
          if (!swiper.clickedSlide) {
            return;
          }
          let pos = 0;
          const listWidth = swiper.wrapperEl.clientWidth;
          const boxHarf = swiper.width / 2;
          const targetLeft = (
            (event.target as HTMLElement).offsetParent as HTMLElement
          ).offsetLeft;
          const selectTargetPos =
            targetLeft + swiper.clickedSlide.clientWidth / 2;
          if (selectTargetPos <= boxHarf) {
            // left
            pos = 0;
          } else if (listWidth - selectTargetPos <= boxHarf) {
            //right
            pos = listWidth - swiper.width;
          } else {
            pos = selectTargetPos - boxHarf;
          }
          swiper.translateTo(-pos, 0);
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto !mx-1 ">
            <Button
              onClick={() => setCategory(item.title)}
              selected={category === item.title}
              selectedStyle="bg-[#1a1a1a] font-bold text-white"
            >
              <span>{item.title}</span>
              <RedDot />
            </Button>
          </SwiperSlide>
        ))}
        <div className="absolute right-0 top-0 w-16 h-full z-10 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
      </Swiper>
    </>
  );
}
