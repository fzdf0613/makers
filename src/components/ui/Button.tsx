"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  selectedStyle?: string;
  className?: string;
  selected?: boolean;
};

export default function Button({
  children,
  selectedStyle,
  className,
  selected = false,
  ...props
}: Props) {
  return (
    // <button
    //   className={`outline-none cursor-pointer flex items-center justify-center border border-neutral-200 py-1.5 px-4 text-sm ${
    //     selected && selectedStyle
    //   } ${className}`}
    //   onClick={(e) => {
    //     onClick();
    //   }}
    // >
    <button
      className={`outline-none cursor-pointer flex items-center justify-center border border-neutral-200 py-1.5 px-4 text-sm ${
        selected && selectedStyle
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
