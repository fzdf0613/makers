import { BiChevronRight } from "react-icons/bi";

type Props = {
  className?: string;
};

export default function RightArrowIcon({ className }: Props) {
  return <BiChevronRight className={`${className}`} />;
}
