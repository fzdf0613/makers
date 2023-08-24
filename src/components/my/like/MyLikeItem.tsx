import LikeIcon2 from "@/components/ui/icons/LikeIcon2";
import Image from "next/image";
import Link from "next/link";

export default function MyLikeItem() {
  return (
    <Link className="pb-6" href={"/"}>
      <div className="relative py-5 bg-[#f1f1f1]">
        <Image
          className="w-full object-cover aspect-square"
          src="/images/defaultAvatar.png"
          alt="order-thumbnail"
          width={300}
          height={300}
        />
        <div className="h-8 w-8 bg-white absolute bottom-2 right-2 flex items-center justify-center">
          <LikeIcon2 active className="w-5 h-5" />
        </div>
      </div>
      <div className="pt-2">
        <p className="font-sm">
          고소한 땅콩과 바삭한 과자의 만남, 땅콩엿(20개입)
        </p>
        <p className="mt-1 text-[#6c6c6c] text-[13px]">17,800원</p>
      </div>
    </Link>
  );
}
