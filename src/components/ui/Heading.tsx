import { memo } from "react";

type Props = {
  text: string;
};

const Heading = ({ text }: Props) => {
  return <h3 className="font-bold text-2xl">{text}</h3>;
};

export default memo(Heading);
