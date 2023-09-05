import { Dispatch, SetStateAction, useEffect } from "react";
import CloseIcon from "../ui/icons/CloseIcon";
import { CartItem } from "./OrderBar";

type Props = {
  cart: { optionIndex: number; count: number }[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  productName: string;
  price: number;
  options: string[];
  optionPrices: number[];
  openOptionBox: boolean;
  setOpenOptionBox: Dispatch<SetStateAction<boolean>>;
  handleCancelClick: () => void;
  handleOrder: () => void;
};

export default function OrderBox({
  cart,
  setCart,
  productName,
  price,
  options,
  optionPrices,
  openOptionBox,
  setOpenOptionBox,
  handleCancelClick,
  handleOrder,
}: Props) {
  const plusCount = (i: number) => {
    const targetItem = cart[i];
    targetItem.count++;
    setCart((prev) => [...prev]);
  };

  const minusCount = (i: number) => {
    const targetItem = cart[i];
    if (targetItem.count == 1) {
      return;
    }
    targetItem.count--;
    setCart((prev) => [...prev]);
  };

  const deleteItem = (i: number) => {
    setCart((prev) => prev.filter((item, index) => i !== index));
  };

  useEffect(() => {
    if (cart.length === 0) {
      setOpenOptionBox(true);
    }
  }, [cart, setOpenOptionBox]);

  return (
    <div
      className={`w-full max-w-[640px] rounded-t-2xl bg-white pt-14 pb-8 px-4 m-auto fixed bottom-0 ease-in duration-300 ${
        openOptionBox ? "translate-y-full" : ""
      }`}
    >
      <div className="text-sm flex flex-col">
        <button onClick={handleCancelClick}>
          <CloseIcon className="w-7 h-7 absolute top-4 right-4 text-[#9b9b9b]" />
        </button>
        {/* 옵션 */}
        <div className="px-4 max-h-[181px] bg-[#fafafa] rounded-[4px] overflow-y-scroll">
          {cart &&
            cart.map((item, i) => (
              <div className="py-4 relative" key={item.optionIndex}>
                <p className="pr-8">{productName}</p>
                {options && (
                  <p>{` : ${options[item.optionIndex]}(+${optionPrices[
                    item.optionIndex
                  ].toLocaleString()})`}</p>
                )}
                {options && (
                  <button
                    className="rounded-full w-4 h-4 bg-[#d5d5d5] top-[18px] right-0 absolute flex items-center justify-center"
                    onClick={() => {
                      deleteItem(i);
                    }}
                  >
                    <CloseIcon className="text-white" />
                  </button>
                )}
                <div className="mt-2">
                  <div className="flex justify-between">
                    <div className="bg-white border border-[#ededed] flex h-8 items-center">
                      <button
                        className="w-8 h-full"
                        onClick={() => {
                          minusCount(i);
                        }}
                      >
                        -
                      </button>
                      <div className="w-[60px] h-full border-x border-[#ededed] text-center align-bottom flex items-center justify-center">
                        {item.count}
                      </div>
                      <button
                        className="w-8 h-full"
                        onClick={() => {
                          plusCount(i);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="font-bold">
                      {(
                        item.count *
                        (price + (options ? optionPrices[item.optionIndex] : 0))
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {options && (
          <button
            className="border border-[#ededed] py-3.5 mt-2"
            onClick={() => setOpenOptionBox(true)}
          >
            다른 옵션 추가
          </button>
        )}
        {/* 가격 */}
        <div className="flex pt-4 pb-3 justify-between">
          <span className="text-base">금액</span>
          <span className="text-lg font-bold">
            {cart &&
              cart
                .reduce(
                  (acc, cur, i) =>
                    acc +
                    cur.count *
                      (price + (options ? optionPrices[cur.optionIndex] : 0)),
                  0
                )
                .toLocaleString()}
            원
          </span>
        </div>
        <div className="bg-[#fafafa] text-[13px] text-[#9b9b9b] py-3 pl-8 pr-2">
          <ul className="list-disc">
            <li>
              일반지역 기준 배송비입니다. <br />
              배송지를 변경하시는 경우 배송비가 달라질 수 있습니다.
            </li>
          </ul>
        </div>
        <button
          className="font-bold text-white rounded-[4px] bg-[#ed554d] mt-6 h-14 text-base"
          onClick={handleOrder}
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
