"use client";

type Props = {
  children: React.ReactNode;
  selectedStyle?: string;
  customStyle?: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function Button({
  children,
  selectedStyle,
  customStyle,
  selected = false,
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`outline-none cursor-pointer flex items-center justify-center border border-neutral-200 py-1.5 px-4 text-sm ${
        selected && selectedStyle
      } ${customStyle}`}
      onClick={(e) => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
