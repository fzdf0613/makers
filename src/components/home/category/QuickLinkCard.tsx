import Image from "next/image";
import Description from "@/components/ui/Description";
import { Product } from "@/customType/product";

type Props = {
  product: Product;
};

export default function QuickLinkCard({ product }: Props) {
  return (
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
  );
}
