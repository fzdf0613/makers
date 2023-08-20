import { MdOutlineKeyboardArrowUp } from "react-icons/md";

type Props = {
  className: string;
};

export default function DropUpIcon({ className }: Props) {
  return <MdOutlineKeyboardArrowUp className={`${className}`} />;
}
