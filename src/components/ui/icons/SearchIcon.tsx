import { BiSearch } from "react-icons/bi";

type Props = {
  className?: string;
};

export default function SearchIcon({ className }: Props) {
  return <BiSearch className={`w-6 h-6 ${className}`} />;
}
