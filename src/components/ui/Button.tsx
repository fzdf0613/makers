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
      className={`flex items-center border border-neutral-200 py-1.5 px-4 text-sm -z-10 ${
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
