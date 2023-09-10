import { MdOutlineClose } from "react-icons/md";

type Props = {
  id?: string;
  className?: string;
};

export default function CloseIcon({ className, id }: Props) {
  return <MdOutlineClose className={className} id={id} />;
}
