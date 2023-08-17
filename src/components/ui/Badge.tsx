type Props = {
  style?: string;
  text: string;
};
export default function Badge({ style = "default", text }: Props) {
  return (
    <div
      className={`${getStyle(
        style
      )} font-bold text-white text-xs text-center px-2 py-1`}
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
    default:
      throw Error("지원하지 않는 Badge Style.");
  }
}
