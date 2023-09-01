import LikeIcon from "@/components/ui/icons/LikeIcon";
import { useState, useLayoutEffect, MouseEvent } from "react";
import useCurrentUser from "@/hooks/user";
import { signIn } from "next-auth/react";

type Props = {
  name: string;
  price: number;
  productId: string;
};

export default function BaseInfo({ name, price, productId }: Props) {
  const { user, toggleLike } = useCurrentUser();
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    setIsActive(user.like.includes(productId));
  }, [user, productId]);

  const handleLike = (e: MouseEvent) => {
    if (!user) {
      signIn();
      return;
    }
    toggleLike(productId, !user.like.includes(productId));
    setIsActive((prev) => !prev);
  };

  return (
    <section className="border-b border-t border-neutral-200 rounded-t-2xl p-5 -translate-y-[10px] bg-white">
      <h2 className="text-md font-semibold">{name}</h2>
      <div className="flex justify-between pt-[10px]">
        <h3>
          <strong className="text-xl">{price.toLocaleString()}</strong>
          <span className="text-sm">원</span>
        </h3>
        <button
          onClick={(e) => {
            handleLike(e);
          }}
        >
          <LikeIcon active={isActive} />
        </button>
      </div>
    </section>
  );
}
