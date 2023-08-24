"use client";
import HomeItemList from "@/components/home/HomeItemList";
import Dropdown from "@/components/ui/Dropdown";

export default function Home() {
  return (
    <>
      <div className="pb-3">
        <Dropdown />
      </div>
      <HomeItemList />
    </>
  );
}
