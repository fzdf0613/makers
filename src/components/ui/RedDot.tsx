type DotSize = "sm" | "md";
type Props = {
  size?: DotSize;
  hidden?: Boolean;
};
export default function RedDot({ size = "md", hidden = true }: Props) {
  return (
    <span
      className={`${getSizeStyle(size)} ${
        hidden && "hidden"
      } absolute -right-[1px] rounded-full bg-red-600`}
    ></span>
  );
}

function getSizeStyle(size: DotSize): string {
  switch (size) {
    case "md":
      return "h-1.5 w-1.5";
    case "sm":
      return "h-1 w-1";
    default:
      throw new Error(`지원하지않는 RedDot Size 입니다. : ${size}`);
  }
}
