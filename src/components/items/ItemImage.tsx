import Image from "next/image";

type Props = {
  imageUrl: string;
  alt: string;
};

export default function ItemImage({ imageUrl, alt }: Props) {
  return (
    <div className="w-full h-[calc(55vw+16px)] sm:h-[460px] relative bg-blue-200 ">
      <Image
        priority
        src={imageUrl}
        alt={alt}
        fill
        className="bg-blue-200"
        sizes="640px"
      />
    </div>
  );
}
