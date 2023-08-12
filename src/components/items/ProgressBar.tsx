type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="w-full h-1 bg-neutral-200 relative my-1">
      <div
        className={`h-1 bg-[#ED554D] absoulte left-0 top-0`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
