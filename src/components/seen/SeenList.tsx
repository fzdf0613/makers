"use client";

import { useSeenProducts } from "@/hooks/products";
import SeenItem from "./SeenItem";

export default function SeenList() {
  const { products, isValidating, resetSeenList, removeSeenList } =
    useSeenProducts();
  return (
    !isValidating &&
    products &&
    (products.length > 0 ? (
      <div>
        <div className="text-sm text-[#a8a8a8] py-5 flex justify-between">
          <p>최근 본 상품이 최대 50개까지 저장됩니다.</p>
          <button
            className="underline"
            onClick={() => {
              resetSeenList();
            }}
          >
            전체삭제
          </button>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <SeenItem
                product={product}
                handleCancel={() => {
                  removeSeenList(product.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="py-[50px] flex flex-col items-center justify-center">
        <strong>최근 본 제품이 없습니다.</strong>
        <p className="mt-1">메이커스가 엄선한 제품을 둘러보세요.</p>
      </div>
    ))
  );
}
