import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type Props = {
  className?: string;
  active?: boolean;
};

export default function LikeIcon({ className, active = false }: Props) {
  if (active) {
    return <AiFillHeart className={`w-6 h-6 text-[#dc635d] ${className}`} />;
  } else {
    return (
      <AiOutlineHeart className={`w-6 h-6 text-neutral-400 ${className}`} />
    );
  }
}
