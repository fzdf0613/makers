type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function AccountInput(props: Props) {
  return (
    <input
      {...props}
      className="border-neutral-300 border-b pb-2 mb-5 outline-none focus:border-black"
      required
    />
  );
}
