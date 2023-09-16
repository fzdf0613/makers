"use client";

import { useSeenProducts } from "@/hooks/products";
import SeenItem from "./SeenItem";

export default function SeenList() {
  const { products, isValidating, resetSeenList, removeSeenList } =
    useSeenProducts();

  if (!products) {
    return <Skeleton />;
  }

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

function Skeleton() {
  return (
    <div>
      <div className="py-5 flex">
        <p className="w-1/2 h-[12px] bg-[#efefef] rounded-sm" />
      </div>
      <div>
        <div className="py-4 flex">
          <div className="w-[160px] h-[112px] relative min-w-[160px] bg-[#efefef]"></div>
          <div className="pl-4 flex flex-col grow">
            <div className="relative flex flex-col justify-center grow">
              <div>
                <h3 className="w-1/3 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/5 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/6 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 flex">
          <div className="w-[160px] h-[112px] relative min-w-[160px] bg-[#efefef]"></div>
          <div className="pl-4 flex flex-col grow">
            <div className="relative flex flex-col justify-center grow">
              <div>
                <h3 className="w-1/3 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/5 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/6 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 flex">
          <div className="w-[160px] h-[112px] relative min-w-[160px] bg-[#efefef]"></div>
          <div className="pl-4 flex flex-col grow">
            <div className="relative flex flex-col justify-center grow">
              <div>
                <h3 className="w-1/3 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/5 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
                <div className="w-1/6 mt-1 h-[13px] bg-[#efefef]  rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
