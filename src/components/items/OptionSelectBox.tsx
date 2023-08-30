import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../ui/icons/CloseIcon";
import CheckIcon from "../ui/icons/CheckIcon";
import { CartItem } from "./OrderBar";

type Props = {
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  options: string[];
  optionPrices: number[];
  openOptionBox: boolean;
  setOpenOptionBox: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
  handleCancelClick: () => void;
  selectedOption: string | undefined;
};

export default function OptionSelectBox({
  setCart,
  options,
  optionPrices,
  openOptionBox,
  setOpenOptionBox,
  setSelectedOption,
  handleCancelClick,
  selectedOption,
}: Props) {
  return (
    <div
      className={`w-full max-w-[640px] h-[596px] rounded-t-2xl bg-white pt-14 pb-8 px-4 m-auto fixed bottom-0 ease-in duration-300 ${
        openOptionBox ? "" : "translate-y-full"
      }`}
    >
      <div className="text-sm flex flex-col">
        <button onClick={handleCancelClick}>
          <CloseIcon className="w-7 h-7 absolute top-4 right-4 text-[#9b9b9b]" />
        </button>
        <div className="h-[444px]">
          <p className="text-[#9b9b9b]">제품 옵션 선택</p>
          <ul className="mt-2 border border-[#ededed] rounded-md">
            {options.map((option, i) => (
              <li className="bg-[#fafafa] px-4" key={i}>
                <button
                  className={`${
                    i === 0 ? "" : "border-t"
                  } border-[#ededed] py-[13px] w-full flex flex-col ${
                    selectedOption === option ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  <span className="flex">
                    {selectedOption === option && (
                      <CheckIcon className="w-4 h-4 mr-2" />
                    )}
                    {option}
                  </span>
                  {optionPrices[i] !== 0 && (
                    <p className="text-[#9b9b9b] mt-1 pl-2">
                      {`(+${optionPrices[i].toLocaleString()}원)`}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            setOpenOptionBox(false);
            setCart((prev) => {
              const existItem = prev.find(
                (item) => selectedOption === options[item.optionIndex]
              );
              if (existItem) {
                existItem.count++;
                return [...prev];
              }

              return [
                ...prev,
                {
                  optionIndex: options.findIndex(
                    (option) => option === selectedOption
                  ),
                  count: 1,
                },
              ];
            });
          }}
          disabled={selectedOption === undefined}
          className={`rounded-md mt-2 text-center py-4 text-base ${
            selectedOption
              ? "text-white bg-[#1a1a1a]"
              : "text-[#9b9b9b] bg-[#ededed]"
          }`}
        >
          옵션추가
        </button>
      </div>
    </div>
  );
}
