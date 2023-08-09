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

import { categoriesForUI } from "@/constants/categories";
import SlideBar from "../SlideBar";

export default function HomeCategoryBar() {
  const [category, setCategory] = useState("전체");
  return (
    // <>
    //   <Swiper
    //     className="!py-3 !first:ml-4"
    //     slidesPerView={"auto"}
    //     freeMode={true}
    //     modules={[FreeMode]}
    //     threshold={30}
    //     setWrapperSize
    //     touchStartForcePreventDefault
    //     onClick={(swiper, event) => {
    //       if (!swiper.clickedSlide) {
    //         return;
    //       }
    //       let pos = 0;
    //       const listWidth = swiper.wrapperEl.clientWidth;
    //       const boxHarf = swiper.width / 2;
    //       const targetLeft = (
    //         (event.target as HTMLElement).offsetParent as HTMLElement
    //       ).offsetLeft;
    //       const selectTargetPos =
    //         targetLeft + swiper.clickedSlide.clientWidth / 2;
    //       if (selectTargetPos <= boxHarf) {
    //         // left
    //         pos = 0;
    //       } else if (listWidth - selectTargetPos <= boxHarf) {
    //         //right
    //         pos = listWidth - swiper.width;
    //       } else {
    //         pos = selectTargetPos - boxHarf;
    //       }
    //       swiper.translateTo(-pos, 0);
    //     }}
    //   >
    //     {categoriesForUI.map((item, index) => (
    //       <SwiperSlide key={index} className="!w-auto !mx-1 ">
    //         <Button
    //           onClick={() => setCategory(item.title)}
    //           selected={category === item.title}
    //           selectedStyle="bg-[#1a1a1a] font-bold text-white"
    //         >
    //           <span>{item.title}</span>
    //           <RedDot />
    //         </Button>
    //       </SwiperSlide>
    //     ))}
    //     {/* 끝 부분 투명 효과 */}
    //     <div className="absolute right-0 top-0 w-16 h-full z-10 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
    //   </Swiper>
    // </>
    <SlideBar
      itemList={categoriesForUI.map((item) => ({
        text: item.title,
        url: item.url,
      }))}
      selectedStyle="bg-[#1a1a1a] font-bold text-white"
      selectItem={(item) => {
        setCategory(item);
      }}
      currentItem={category}
    />
  );
}
