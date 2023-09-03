import { Product } from "@/customType/product";
import CategoryItem from "./CategoryItem";

type Props = {
  products: Product[];
  filterOpen: "LEFT" | "RIGHT" | undefined;
};

export default function CategoryItemList({ products, filterOpen }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {filterOpen && (
        <div className="absolute w-full h-full left-0 top-0 bg-[#000] opacity-30 z-[5]" />
      )}
      {products.length !== 0 &&
        products.map((product) => (
          <CategoryItem key={product.id} product={product} />
        ))}
      {products.length === 0 && (
        <div className="col-span-2 h-[375px] flex justify-center items-center">
          현재 판매중인 제품이 없습니다.
        </div>
      )}
    </div>
  );
}
