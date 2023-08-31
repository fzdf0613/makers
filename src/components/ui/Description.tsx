type Props = {
  text: string;
  className?: string;
};

export default function Description({ text, className }: Props) {
  return (
    <div className={`w-full py-2 text-sm whitespace-pre-wrap ${className}`}>
      {text}
    </div>
  );
}
