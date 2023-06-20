type BadgeStyle = "default" | "alert";

type Props = {
  style?: BadgeStyle;
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

function getStyle(style: BadgeStyle): string {
  switch (style) {
    case "default":
      return "bg-black";
    case "alert":
      return "bg-[#db635d]";
    default:
      throw Error(
        "지원하지 않는 Badge Style. BadgeStyle 타입 정의를 확인하세요."
      );
  }
}
