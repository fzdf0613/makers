import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import Button from "../ui/Button";
import { useState } from "react";

type Props = {
  count?: number;
};

export default function LikeButton({ count }: Props) {
  const [isActive, setIsActvie] = useState(false);
  return (
    <Button
      customStyle="py-3 w-fit"
      selectedStyle="bg-[#FAFAFA]"
      selected={isActive}
      onClick={() => setIsActvie((prev) => !prev)}
    >
      {isActive ? <FaHeart className="text-red-500" /> : <FiHeart />}
      {count && <span className="ml-2 font-semibold text-xs">{count}</span>}
    </Button>
  );
}
