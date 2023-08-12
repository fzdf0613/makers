"use client";
import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import HomeItemLists from "@/components/home/HomeItemLists";
import Dropdown from "@/components/ui/Dropdown";
import { useScrollYContext } from "@/context/ScrollYContext";

export default function Home() {
  const { isScrollDown } = useScrollYContext();

  return (
    <section className="relative pt-[153px] w-full">
      <div
        className={`fixed z-30 ${
          isScrollDown ? "top-[55px]" : "top-[95px]"
        } w-full max-w-[640px] z-10 bg-white ease-in duration-100`}
      >
        <HomeCategoryBar />
      </div>
      <div className="pb-3">
        <Dropdown />
      </div>
      <HomeItemLists />
    </section>
  );
}
