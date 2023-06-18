"use client";

type Props = {
  children: React.ReactNode;
  selectedStyle?: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function Button({
  children,
  selectedStyle,
  selected = false,
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`border border-neutral-200 py-1.5 px-4 text-sm -z-10 ${
        selected && selectedStyle
      }`}
      onClick={(e) => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
