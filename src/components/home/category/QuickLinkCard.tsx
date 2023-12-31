"use client";
import Image from "next/image";
import Description from "@/components/ui/Description";
import Link from "next/link";
import { CategoryValue } from "@/customType/category";
import { useQuickLinkProduct } from "@/hooks/product";
import Heading from "@/components/ui/Heading";

type Props = {
  category: CategoryValue;
};

export default function QuickLinkCard({ category }: Props) {
  const { product, isLoading } = useQuickLinkProduct(category);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!product) {
    return (
      <div className="">
        <div className="h-[600px] flex items-center justify-center bg-[#fafafa]">
          <Heading text="해당 카테고리에 등록된 상품이 없습니다." />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/items/${product.id}`}>
      <div className="px-4 pt-6 pb-12 bg-[#fafafa]">
        <div className="relative pb-[61.2244%] mb-4">
          <Image
            className="object-cover"
            priority
            src={product.imageUrl}
            alt="quick-link-image"
            fill
          />
        </div>
        <div className="text-xl font-bold">{product.homeTitle}</div>
        <Description text={product.description} />
      </div>
    </Link>
  );
}

function Skeleton() {
  return (
    <div className="px-4 pt-6 pb-12">
      <div className="relative pb-[61.2244%] mb-4 bg-[#efefef]" />
      <div className="w-1/2 h-[24px] rounded-sm bg-[#efefef] mb-1" />
      <div className="w-full h-[14px] bg-[#efefef] mb-1" />
      <div className="w-full h-[14px] bg-[#efefef]" />
    </div>
  );
}
