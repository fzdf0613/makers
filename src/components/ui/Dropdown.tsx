"use client";

import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { sortItemList } from "@/constants/sortItems";

type Props = {
  selectedOption: string;
  handleSelect: (option: string) => void;
};

export default function Dropdown({ selectedOption, handleSelect }: Props) {
  // const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full px-4 flex relative justify-end text-sm font-extralight text-neutral-500">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {/* <span>{selected}</span> */}
        <span>
          {sortItemList.find((item) => item.value === selectedOption)?.name}
        </span>
        <MdOutlineKeyboardArrowDown className="text-base" />
      </div>
      <ul
        className={`py-2 z-10 bg-white ${
          !isOpen && "hidden"
        } absolute right-4 top-6 border border-neutral-200`}
      >
        {sortItemList.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between px-4 py-2 w-36 cursor-pointer ${
              // selected === item && "font-bold text-black"
              selectedOption === item.value && "font-bold text-black"
            }`}
            onClick={() => {
              // setSelected(item);
              handleSelect(item.value);
              setIsOpen(false);
            }}
          >
            <span>{item.name}</span>
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
