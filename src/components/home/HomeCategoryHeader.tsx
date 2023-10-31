"use client";
import { Suspense, useLayoutEffect, useState } from "react";
import { useScrollYContext } from "@/context/ScrollYContext";
import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import { usePathname } from "next/navigation";
import SkeletonCategoryBar from "./skeleton/SkeletonCategoryBar";

export default function HomeCategoryHeader() {
  const pathName = usePathname();
  const { isScrollDown } = useScrollYContext();
  const [scrollAction, setScrollAction] = useState(false);

  useLayoutEffect(() => {
    if (!pathName) {
      return;
    }
    if (pathName === "/" || pathName.startsWith("/home")) {
      setScrollAction(true);
    }
  }, [pathName]);

  return (
    <section className="relative pt-[153px] w-full">
      <div
        className={`fixed z-30 ${
          scrollAction && isScrollDown ? "top-[55px]" : "top-[95px]"
        } w-full max-w-[640px] z-10 bg-white ease-in duration-100`}
      >
        <Suspense fallback={<SkeletonCategoryBar />}>
          <HomeCategoryBar />
        </Suspense>
      </div>
    </section>
  );
}
