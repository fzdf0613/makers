"use client";
import { forwardRef } from "react";

type Props = {
  name: string;
  type?: string;
  isRequired: boolean;
};

const afterStyle =
  "after:content-['*'] after:text-sm after:text-red-600 after:absolute after:-top-1 after:-right-2";

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, type = "text", isRequired }, inputListsRef) => {
    return (
      <div className="w-full m-auto flex p-4 items-center justify-between border-b border-neutral-200">
        <span
          className={`font-bold text-sm relative ${isRequired && afterStyle}`}
        >
          {name}
        </span>
        <input
          name={name}
          required={isRequired}
          className="border border-neutral-200 outline-none p-2 text-sm w-4/5"
          ref={inputListsRef}
          type={type}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
