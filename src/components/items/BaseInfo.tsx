import LikeButton from "../LikeButton";

type Props = {
  name: string;
  price: number;
  productId: string;
};

export default function BaseInfo({ name, price, productId }: Props) {
  return (
    <section className="border-b border-t border-neutral-200 rounded-t-2xl p-5 -translate-y-[10px] bg-white">
      <h2 className="text-md font-semibold">{name}</h2>
      <div className="flex justify-between pt-[10px]">
        <h3>
          <strong className="text-xl">{price.toLocaleString()}</strong>
          <span className="text-sm">원</span>
        </h3>
        <LikeButton productId={productId} iconStyle="item" />
      </div>
    </section>
  );
}
