import Link from "next/link";
import ListIcon from "./ui/icons/ListIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import { useState } from "react";

export default function NavBar() {
  return (
    <nav className="py-1 flex justify-between items-center px-1 h-[55px]">
      <div className="flex">
        <ListIcon />
        <h1 className="ml-2 font-bold text-xl">makers</h1>
      </div>
      <Link href="/search">
        <SearchIcon />
      </Link>
    </nav>
  );
}
