type Props = {
  text: string;
  customStyle?: string;
};
export default function Divider({ text, customStyle }: Props) {
  return (
    <h1
      className={`text-xl font-semibold bg-neutral-200 w-full p-2 mt-8 ${customStyle}`}
    >
      {text}
    </h1>
  );
}
