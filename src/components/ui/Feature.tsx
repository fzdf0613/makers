type Props = {
  customStyle?: string;
  text: string;
};

export default function Feature({ customStyle, text }: Props) {
  return (
    <strong className={`text-[#ED554D] text-[13px] py-4 ${customStyle}`}>
      {text}
    </strong>
  );
}
