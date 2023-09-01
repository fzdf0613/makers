import { useState, useLayoutEffect, MouseEvent } from "react";
import useCurrentUser from "@/hooks/user";
import { signIn } from "next-auth/react";
import LikeIcon from "./ui/icons/LikeIcon";
import LikeIcon2 from "./ui/icons/LikeIcon2";

type Props = {
  productId: string;
  iconStyle: "home" | "item";
  className?: string;
  iconClassName?: string;
  count?: number;
};

export default function LikeButton({
  productId,
  iconStyle,
  className,
  iconClassName,
  count,
}: Props) {
  const { user, toggleLike } = useCurrentUser();
  const [isActive, setIsActive] = useState(false);
  const [likeCount, setLikeCount] = useState(count);

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
    if (likeCount !== undefined) {
      setLikeCount(isActive ? likeCount - 1 : likeCount + 1);
    }
    setIsActive((prev) => !prev);
  };

  return (
    <button
      className={className}
      onClick={(e) => {
        handleLike(e);
      }}
    >
      {iconStyle === "item" && (
        <LikeIcon active={isActive} className={iconClassName} />
      )}
      {iconStyle === "home" && (
        <LikeIcon2 active={isActive} className={iconClassName} />
      )}
      {count !== undefined && (
        <p className="ml-2 font-semibold text-[13px]">
          {`${likeCount?.toLocaleString()}`}
        </p>
      )}
    </button>
  );
}
