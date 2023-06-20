type Props = {
  text: string;
};

export default function Heading({ text }: Props) {
  return <h3 className="font-bold text-2xl">{text}</h3>;
}
