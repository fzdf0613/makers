import { MdOutlineClose } from "react-icons/md";

type Props = {
  className?: string;
};

export default function CloseIcon({ className }: Props) {
  return <MdOutlineClose className={className} />;
}
