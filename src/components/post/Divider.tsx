type Props = {
  text: string;
};
export default function Divider({ text }: Props) {
  return (
    <h1 className="text-xl font-semibold bg-neutral-200 w-full p-2 mt-8">
      {text}
    </h1>
  );
}
