"use client";
import { useState } from "react";
import Portal from "../ui/Portal";
import OrderModal from "./OrderModal";
import { Product } from "@/customType/product";
import { Post } from "@/customType/post";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  post: Post;
};

export type CartItem = { optionIndex: number; count: number };

export default function OrderBar({ product, post }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      signIn();
      return;
    }
    setModalOpen(true);
  };

  const handleOrder = () => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      signIn();
      return;
    }
    const order = {
      orderedAt: Date.now(),
      userId: session.user.id,
      productName: product.name,
      productId: product.id,
      productImage: product.imageUrl,
      totalPrice: cart.reduce(
        (acc, cur, i) =>
          acc +
          cur.count * (product.price + post.optionsPrices[cur.optionIndex]),
        0
      ),
      count: cart.reduce((acc, cur, i) => acc + cur.count, 0),
      hasReview: false,
    };
    const formData = new FormData();
    formData.append("order", JSON.stringify(order));
    fetch("/api/order", { method: "POST", body: formData })
      .then((res) => {
        if (res.ok) {
          window.alert("주문이 완료되었습니다 !");
          router.push("/");
        } else {
          res.json().then((parsed) => window.alert(parsed.error));
        }
      })
      .catch((e) => {
        window.alert("잠시 후에 다시 시도해주세요.");
      });
  };

  return (
    <div className="w-full h-[96px] pt-2 pb-8 fixed bottom-0 right-0 bg-white">
      <div className="mx-auto w-full h-full flex justify-between max-w-[640px] text-md font-bold text-white px-4">
        <div className="bg-[#1a1a1a] rounded-md w-[28%] flex justify-center items-center cursor-pointer">
          선물하기
        </div>
        <div
          className="bg-[#ed554d] rounded-md ml-2 w-[72%] flex justify-center items-center cursor-pointer"
          onClick={handleOrderClick}
        >
          주문하기
        </div>
      </div>
      {modalOpen && (
        <Portal>
          <OrderModal
            cart={cart}
            setCart={setCart}
            closeModal={() => setModalOpen(false)}
            post={post}
            product={product}
            handleOrder={handleOrder}
          />
        </Portal>
      )}
    </div>
  );
}
