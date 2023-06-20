type Props = {
  text: string;
};

export default function Description({ text }: Props) {
  return <div className="w-full py-2 text-sm">{text}</div>;
}
