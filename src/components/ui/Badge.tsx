type Props = {
  style?: string;
  text: string;
  className?: string;
};
export default function Badge({ style = "default", text, className }: Props) {
  return (
    <div
      className={`${getStyle(
        style
      )} font-bold text-white text-xs text-center px-2 py-1.5 ${className}`}
    >
      {text}
    </div>
  );
}

function getStyle(style: string): string {
  switch (style) {
    case "default":
      return "bg-black";
    case "alert":
      return "bg-[#db635d]";
    case "complete":
      return "bg-[#6c80e4]";
    case "waiting":
      return "bg-[#9b9b9b]";
    default:
      throw Error("지원하지 않는 Badge Style.");
  }
}
