import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import Button from "../ui/Button";
import { useState, useLayoutEffect, MouseEvent, useCallback } from "react";
import useCurrentUser from "@/hooks/user";
import { signIn } from "next-auth/react";

type Props = {
  count: number;
  productId: string;
};

export default function LikeButton({ count, productId }: Props) {
  const [likeCount, setLikeCount] = useState(count);
  const [isActive, setIsActive] = useState(false);
  const { user, toggleLike } = useCurrentUser();

  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    setIsActive(user.like.includes(productId));
  }, [user, productId]);

  const handleLike = (e: MouseEvent) => {
    e.preventDefault();
    if (!user) {
      signIn();
      return;
    }
    toggleLike(productId, !user.like.includes(productId));
    setLikeCount((prev) => (isActive ? prev - 1 : prev + 1));
    setIsActive((prev) => !prev);
  };

  return (
    <Button
      className="py-3 w-fit"
      selectedStyle="bg-[#FAFAFA]"
      selected={isActive}
      onClick={(e) => {
        handleLike(e);
      }}
    >
      {isActive ? <FaHeart className="text-red-500" /> : <FiHeart />}
      <span className="ml-2 font-semibold text-xs">
        {likeCount.toLocaleString()}
      </span>
    </Button>
  );
}
