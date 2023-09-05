"use client";
import {
  MouseEvent,
  useState,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { Post } from "@/customType/post";
import { Product } from "@/customType/product";
import OptionSelectBox from "./OptionSelectBox";
import OrderBox from "./OrderBox";
import { CartItem } from "./OrderBar";

type Props = {
  closeModal: () => void;
  post: Post;
  product: Product;
  cart: { optionIndex: number; count: number }[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  handleOrder: () => void;
};

export default function OrderModal({
  closeModal,
  post,
  product,
  cart,
  setCart,
  handleOrder,
}: Props) {
  const [openOptionBox, setOpenOptionBox] = useState(true);
  const [openAnimation, setOpenAnimation] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>();

  useLayoutEffect(() => {
    if (cart.length > 0) {
      setOpenOptionBox(false);
    }
  }, [cart]);

  const handleClick = (e: MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLDivElement).id === "modal-dialog"
    ) {
      setOpenAnimation(false);
      setTimeout(() => {
        closeModal();
      }, 500);
    }
  };

  const handleCancelClick = () => {
    setSelectedOption(undefined);
    setOpenAnimation(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div
      id="modal-bg"
      className={`fixed top-0 left-0 w-full h-full bg-neutral-900/70 z-[100] ${
        openAnimation ? "animate-modalOpen" : "animate-modalClose"
      }`}
      onClick={handleClick}
    >
      <div
        id="modal-dialog"
        className="h-full mx-4 relative flex justify-center"
      >
        {post.itemOptions && (
          <OptionSelectBox
            setCart={setCart}
            options={post.itemOptions}
            optionPrices={post.optionsPrices}
            openOptionBox={openOptionBox}
            setOpenOptionBox={setOpenOptionBox}
            setSelectedOption={setSelectedOption}
            handleCancelClick={handleCancelClick}
            selectedOption={selectedOption}
          />
        )}
        <OrderBox
          cart={cart}
          setCart={setCart}
          productName={product.name}
          price={product.price}
          options={post.itemOptions}
          optionPrices={post.optionsPrices}
          openOptionBox={openOptionBox}
          setOpenOptionBox={setOpenOptionBox}
          handleCancelClick={handleCancelClick}
          handleOrder={handleOrder}
        />
      </div>
    </div>
  );
}
