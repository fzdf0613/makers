"use client";
import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import HomeItem from "@/components/home/HomeItem";
import Dropdown from "@/components/ui/Dropdown";
import { useScrollYContext } from "@/context/ScrollYContext";
import { DummyHomeItems } from "@/Dummy/dummydata";

export default function Home() {
  const { isScrollDown } = useScrollYContext();
  return (
    <section className="relative pt-[153px] w-full">
      <div
        className={`fixed ${
          isScrollDown ? "top-[55px]" : "top-[95px]"
        } w-full max-w-[640px] z-10 bg-white ease-in duration-100`}
      >
        <HomeCategoryBar />
      </div>
      <div className="pb-3">
        <Dropdown />
      </div>
      <div>
        {DummyHomeItems.map((item) => (
          <HomeItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
