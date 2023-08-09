"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Button, { ButtonProps } from "@/components/ui/Button";
import RedDot from "@/components/ui/RedDot";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";

type Props = Omit<ButtonProps, "children" | "onClick" | "selected"> & {
  itemList: any[];
  selectItem?: (item: string) => void;
  currentItem: string;
};

export default function SlideBar({
  itemList,
  selectItem,
  currentItem,
  ...props
}: Props) {
  return (
    <Swiper
      className="!py-3 !first:ml-4"
      slidesPerView={"auto"}
      freeMode={true}
      modules={[FreeMode]}
      threshold={30}
      setWrapperSize
      touchStartForcePreventDefault
      onClick={(swiper, event) => {
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
      {itemList.map((item, index) => (
        <SwiperSlide key={index} className="!w-auto !mx-1">
          <Button
            onClick={() => {
              selectItem && selectItem(item.text);
            }}
            selected={currentItem === item.text}
            {...props}
          >
            <Link href={item.url}>{item.text}</Link>
            <RedDot />
          </Button>
        </SwiperSlide>
      ))}
      {/* 끝 부분 투명 효과 */}
      <div className="absolute right-0 top-0 w-16 h-full z-10 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
    </Swiper>
  );
}
