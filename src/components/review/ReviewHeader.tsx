import Link from "next/link";

export default function ReviewHeader() {
  return (
    <header className="h-[55px] text-md flex items-center justify-center px-3 relative">
      <div>구매후기 쓰기</div>
      <Link href="back" className="w-[54px] text-center absolute right-0">
        닫기
      </Link>
    </header>
  );
}
