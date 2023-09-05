"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";

type Props = {
  tab: string;
};

export default function ReviewTab({ tab }: Props) {
  const router = useRouter();

  useLayoutEffect(() => {
    if (!tab || (tab !== "written" && tab !== "waiting")) {
      router.replace("/my/review?location=written");
      return;
    }
  }, [tab, router]);

  return (
    <div className="flex text-sm w-full border-y border-[#dee2e6]">
      <div className="w-1/2 text-center border-[#dee2e6] border-r">
        <Link href="/my/review?location=written">
          <div
            className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
              tab === "written" && "border-b-2 border-black bg-white text-black"
            }`}
          >
            작성 목록
          </div>
        </Link>
      </div>
      <div className="w-1/2 text-center">
        <Link href="/my/review?location=waiting">
          <div
            className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
              tab === "waiting" && "border-b-2 border-black bg-white text-black"
            }`}
          >
            작성 대기 목록
          </div>
        </Link>
      </div>
    </div>
  );
}
