import { LuBell } from "react-icons/lu";

type Props = {
  className?: string;
};

export default function AlarmIcon({ className }: Props) {
  return <LuBell className={className} />;
}
