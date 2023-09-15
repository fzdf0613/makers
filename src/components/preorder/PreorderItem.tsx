import Description from "@/components/ui/Description";
import Feature from "@/components/ui/Feature";
import Image from "next/image";
import ShareIcon from "../ui/icons/ShareIcon";
import AlarmIcon from "../ui/icons/AlarmIcon";
import { Product } from "@/customType/product";

type Props = {
  product: Product;
  imagePriority: boolean;
};

export default function PreorderItem({
  product,
  imagePriority = false,
}: Props) {
  return (
    <div className="mt-12">
      <div className=" px-4 w-full">
        <div className="w-full pt-[66.217%] relative">
          <div className="absolute top-[11px] left-[12px] z-[3]">
            <p className="text-xs font-semibold text-white">{product.name}</p>
            <p className="text-xs font-semibold text-white">
              {product.price.toLocaleString()}원
            </p>
          </div>

          <Image
            className="object-fill"
            src={product.imageUrl}
            alt="preorder-item"
            priority={imagePriority}
            fill
            sizes="640px"
          />
        </div>
        <div className="my-4">
          <strong className="font-bold text-xl mt-2">
            {product.homeTitle}
          </strong>
          <Description text={product.description} />
        </div>
        <div className="flex border border-[#e7e7e7] h-12 mt-5">
          <button className="w-[55px] text-center">
            <ShareIcon className="w-5 h-5 m-auto" />
          </button>
          <button className="font-bold text-sm border-[#e7e7e7] border-l grow flex items-center justify-center text-[#9b9b9b]">
            <AlarmIcon className="w-5 h-5 mr-1" />
            톡으로 알림받기
          </button>
        </div>
      </div>
    </div>
  );
}
