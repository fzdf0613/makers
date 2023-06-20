import Link from "next/link";
import ListIcon from "./ui/icons/ListIcon";
import SearchIcon from "./ui/icons/SearchIcon";

export default function NavBar() {
  return (
    <nav className="h-[55px] flex justify-between items-center bg-white">
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
