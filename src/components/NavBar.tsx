"use client";
import Link from "next/link";
import ListIcon from "./ui/icons/ListIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import { useState } from "react";
import Portal from "./ui/Portal";
import SideModal from "./SideModal";

export default function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <nav className="h-[55px] flex justify-between items-center bg-white">
      <div className="flex">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <ListIcon />
        </button>
        <h1 className="ml-2 font-bold text-xl">makers</h1>
      </div>
      <Link href="/search">
        <SearchIcon />
      </Link>
      {modalOpen && (
        <Portal>
          <SideModal closeModal={() => setModalOpen(false)} />
        </Portal>
      )}
    </nav>
  );
}
