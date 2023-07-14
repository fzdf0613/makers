"use client";
import Link from "next/link";
import SearchIcon from "./ui/icons/SearchIcon";
import BackIcon from "./ui/icons/BackIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import { useRouter } from "next/navigation";

export default function NavBar2() {
  const router = useRouter();
  return (
    <nav className="h-[55px] flex justify-between items-center bg-white">
      <div className="flex">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <Link href={"/"}>
          <HomeIcon />{" "}
        </Link>
      </div>
      <Link href="/search">
        <SearchIcon />
      </Link>
    </nav>
  );
}
