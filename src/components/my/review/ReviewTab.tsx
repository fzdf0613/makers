"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useEffect, useMemo, useState } from "react";

export default function ReviewTab() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const location = useMemo(() => searchParams.get("location"), [searchParams]);
  const [tab, setTab] = useState<"written" | "waiting">();

  useLayoutEffect(() => {
    if (!location || (location !== "written" && location !== "waiting")) {
      router.replace("/my/review?location=written");
      return;
    }
    setTab(location);
  }, [location, router]);

  return (
    <div className="flex text-sm w-full border-y border-[#dee2e6]">
      <div className="w-1/2 text-center border-[#dee2e6] border-r">
        <div
          className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
            tab === "written" && "border-b-2 border-black bg-white text-black"
          }`}
        >
          <Link href="/my/review?location=written">작성 목록</Link>
        </div>
      </div>
      <div className="w-1/2 text-center">
        <div
          className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
            tab === "waiting" && "border-b-2 border-black bg-white text-black"
          }`}
        >
          <Link href="/my/review?location=waiting">작성 대기 목록</Link>
        </div>
      </div>
    </div>
  );
}
