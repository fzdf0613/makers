"use client";

type Props = {
  text: string;
  selectedStyle?: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function Button({
  text,
  selectedStyle,
  selected = false,
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`border border-neutral-200 py-1.5 px-4 text-sm -z-10 ${
        selected && selectedStyle
      }`}
      onMouseDown={(e) => {
        e.preventDefault();
        // e.stopPropagation();
      }}
      onClick={(e) => {
        console.log("button clicked");
        onClick();
      }}
    >
      {text}
    </button>
  );
}
