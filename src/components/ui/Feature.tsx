import { memo } from "react";

type Props = {
  style?: "default" | "disabled";
  customStyle?: string;
  text: string;
};

const Feature = ({ style = "default", customStyle, text }: Props) => {
  return (
    <strong className={`${getStyle(style)} text-[13px] py-4 ${customStyle}`}>
      {text}
    </strong>
  );
};

export default memo(Feature);

function getStyle(style: string): string {
  switch (style) {
    case "default":
      return "text-[#ED554D]";
    case "disabled":
      return "text-[#9b9b9b]";
    default:
      throw Error("지원하지 않는 Feature Style.");
  }
}
