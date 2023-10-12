import { memo } from "react";

type Props = {
  text: string;
  className?: string;
};

const Description = ({ text, className }: Props) => {
  return (
    <div className={`w-full py-2 text-sm whitespace-pre-wrap ${className}`}>
      {text}
    </div>
  );
};

export default memo(Description);
