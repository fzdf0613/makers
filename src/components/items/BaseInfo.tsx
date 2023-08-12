import LikeIcon from "@/components/ui/icons/LikeIcon";

type Props = {
  name: string;
  price: number;
};

export default function BaseInfo({ name, price }: Props) {
  return (
    <section className="border-b border-t border-neutral-200 rounded-t-2xl p-5 -translate-y-[10px] bg-white">
      <h2 className="text-md font-semibold">{name}</h2>
      <div className="flex justify-between pt-[10px]">
        <h3>
          <strong className="text-xl">{price.toLocaleString()}</strong>
          <span className="text-sm">원</span>
        </h3>
        <button className="text-neutral-400">
          <LikeIcon />
        </button>
      </div>
    </section>
  );
}
