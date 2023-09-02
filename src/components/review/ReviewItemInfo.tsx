import Image from "next/image";

type Props = {
  imageUrl: string;
  name: string;
  price: number;
};

export default function ReviewItemInfo({ imageUrl, name, price }: Props) {
  return (
    <div className="px-4 py-5 flex border-y border-[#f1f1f1] ">
      <Image
        src={imageUrl}
        alt="review-item-thumbnail"
        width={74}
        height={74}
      />
      <div className="text-[13px] ml-3 flex flex-col justify-center">
        <p>{name}</p>
        <p className="font-bold mt-1">{price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
