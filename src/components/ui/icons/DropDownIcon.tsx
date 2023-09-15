import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  className?: string;
};

export default function DropDownIcon({ className }: Props) {
  return <MdOutlineKeyboardArrowDown className={`${className}`} />;
}
