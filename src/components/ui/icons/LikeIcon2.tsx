import { HiOutlineHeart, HiHeart } from "react-icons/hi";

type Props = {
  className?: string;
  active?: boolean;
};

export default function LikeIcon2({ className, active = false }: Props) {
  if (active) {
    return <HiHeart className={`${className} text-[#dc635d]`} />;
  } else {
    return <HiOutlineHeart className={className} />;
  }
}
