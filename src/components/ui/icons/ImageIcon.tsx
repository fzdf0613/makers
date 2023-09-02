import { CiImageOn } from "react-icons/ci";

type Props = {
  className?: string;
};

export default function ImageIcon({ className }: Props) {
  return <CiImageOn className={className} />;
}
