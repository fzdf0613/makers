"use client";
import Image from "next/image";
import LikeButton from "./LikeButton";
import Heading from "../ui/Heading";
import Description from "../ui/Description";
import Feature from "../ui/Feature";
import Badge from "../ui/Badge";

type HomeItem = {
  image: any;
  title: string;
  desc: string;
  feature: string;
};

type Props = {
  item: HomeItem;
};

export default function HomeItem({ item }: Props) {
  return (
    <div className="mb-9">
      <div className="relative w-full pb-[56.25%]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div className="absolute left-4 -bottom-2">
          <Badge text="매진 임박" style="alert" />
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <Heading text={item.title} />
        <Description text={item.desc} />
        <Feature text={item.feature} customStyle="pt-2" />
        <LikeButton count={197} />
      </div>
    </div>
  );
}
