type Props = {
  name: string;
  type?: string;
};

export default function Input({ name, type = "text" }: Props) {
  return (
    <div className="w-full m-auto flex p-4 items-center justify-between border-b border-neutral-200">
      <span className="font-bold text-sm">{name}</span>
      <input
        className="border border-neutral-200 outline-none p-2 text-sm w-4/5"
        required
        type={type}
      />
    </div>
  );
}
