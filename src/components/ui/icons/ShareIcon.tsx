import { FiShare } from "react-icons/fi";

type Props = {
  className?: string;
};

export default function ShareIcon({ className }: Props) {
  return <FiShare className={className} />;
}
