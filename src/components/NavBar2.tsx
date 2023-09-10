"use client";
import Link from "next/link";
import SearchIcon from "./ui/icons/SearchIcon";
import BackIcon from "./ui/icons/BackIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar2() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="h-[55px] flex justify-between items-center bg-white border-b border-neutral-200 px-2 relative">
      <div className="flex">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <Link href={"/"}>
          <HomeIcon />{" "}
        </Link>
      </div>
      <h2 className="absolute left-[50%] -translate-[50%]">
        {setTitle(pathname)}
      </h2>
      {pathname !== "/search" && (
        <Link href="/search">
          <SearchIcon />
        </Link>
      )}
    </nav>
  );
}

function setTitle(pathname: string) {
  switch (pathname) {
    case "/post/new":
      return "상품 등록";
    case "/profile":
      return "프로필 설정";
    case "/search":
      return "검색";
    default:
      return "";
  }
}
