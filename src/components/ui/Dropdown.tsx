"use client";

import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import { CiCircleInfo } from "react-icons/ci";

type Props = {
  options?: string[];
};

const defaultOptions = [
  "추천순",
  "최신순",
  "마감 임박 순",
  "주문 많은 순",
  "만족도 높은 순",
];
export default function Dropdown({ options = defaultOptions }: Props) {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className="w-full px-4 flex relative justify-end text-sm font-extralight text-neutral-500">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span>{selected}</span>
        <MdOutlineKeyboardArrowDown className="text-base" />
      </div>
      <ul
        className={`py-2 ${
          !isOpen && "hidden"
        } absolute right-4 top-6 border border-neutral-200`}
      >
        {options.map((item, index) => (
          <li
            key={item}
            className={`flex items-center justify-between px-4 py-2 w-36 cursor-pointer ${
              selected === item && "font-bold text-black"
            }`}
            onClick={() => {
              setSelected(item);
              setIsOpen(false);
            }}
          >
            <span>{item}</span>
            {index === 0 && (
              <i>
                <CiCircleInfo className="text-xl" />
              </i>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
