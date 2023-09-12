"use client";
import { useState, useRef, useEffect } from "react";
import VerticalDotsIcon from "../ui/icons/VerticalDotsIcon";

type Props = {
  handleModify: () => void;
  handleDelete: () => void;
};

export default function ModifyButton({ handleDelete, handleModify }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openMenu) {
      boxRef.current?.focus();
    }
  }, [openMenu]);

  return (
    <>
      {!openMenu && (
        <button
          className="absolute top-5 right-0 text-[#9b9b9b] w-5 h-5"
          onClick={() => {
            setOpenMenu(true);
          }}
        >
          <VerticalDotsIcon />
        </button>
      )}
      {openMenu && (
        <div
          ref={boxRef}
          tabIndex={0}
          className={`absolute top-5 right-0 border border-[#e4e4e4] text-[#4c4c4c] text-xs w-[46px] h-[72px] flex flex-col`}
          onBlur={() => {
            setOpenMenu(false);
          }}
        >
          <button
            className="text-center h-1/2 border-b border-[#e4e4e4]"
            onMouseDown={() => {
              handleModify();
              setOpenMenu(false);
            }}
          >
            수정
          </button>
          <button
            className="text-center h-1/2"
            onMouseDown={() => {
              setOpenMenu(false);
              handleDelete();
            }}
          >
            삭제
          </button>
        </div>
      )}
    </>
  );
}
