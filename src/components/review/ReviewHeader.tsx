"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReviewHeader() {
  const router = useRouter();
  const handleClick = () => {
    if (!router) {
      return;
    }
    router.back();
  };
  return (
    <header className="h-[55px] text-md flex items-center justify-center px-3 relative">
      <div>구매후기 쓰기</div>
      <button
        className="w-[54px] text-center absolute right-0"
        onClick={handleClick}
      >
        닫기
      </button>
    </header>
  );
}
