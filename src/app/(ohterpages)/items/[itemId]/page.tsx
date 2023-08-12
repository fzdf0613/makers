"use client";
import BaseInfo from "@/components/items/BaseInfo";
import ItemImage from "@/components/items/ItemImage";
import ItemNavBar from "@/components/items/ItemNavBar";
import OrderBar from "@/components/items/OrderBar";
import OrderInfo from "@/components/items/OrderInfo";
import usePost from "@/hooks/post";
import useProduct from "@/hooks/product";
import useScrollYHandler from "@/hooks/scrollYHandler";
import { useEffect, useRef, useState } from "react";

export default function ItemPage({ params }: { params: { itemId: string } }) {
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { Y, isScrolled: isScrollDown } = useScrollYHandler(0);
  const [tab, setTab] = useState<"상세정보" | "구매후기" | "제품문의">(
    "상세정보"
  );
  const [isOverlap, setIsOverlap] = useState(false);
  const { post } = usePost(params.itemId);
  const { product } = useProduct(params.itemId);

  useEffect(() => {
    if (!navRef.current || !contentRef.current) {
      return;
    }
    const navBottomY = navRef.current.getBoundingClientRect().bottom;
    const contentTopY = contentRef.current!.getBoundingClientRect().top;
    setIsOverlap(navBottomY >= contentTopY - 12);
  }, [Y]);

  return (
    <div className="w-full">
      {post && product && (
        <>
          <ItemImage imageUrl={product.imageUrl} alt={product.name} />
          <BaseInfo name={product.name} price={product.price} />
          <OrderInfo product={product} />
          <ItemNavBar
            tab={tab}
            setTab={setTab}
            navRef={navRef}
            isOverlap={isOverlap}
            reviewCount={post.reviewCount}
            qnaCount={post.qnaCount}
          />
          {/* 본문(컨텐츠) */}
          <div>
            {/* 앵커 */}
            <div
              className={`h-16 flex gap-2 py-3 px-4 sticky bg-white ${
                isOverlap ? "z-[5]" : "z-[4]"
              } ${
                isScrollDown ? "top-[53px]" : "top-[110px]"
              } ease-in duration-100`}
            >
              <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
                요약
              </div>
              <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
                스토리
              </div>
              <div className="px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center">
                보관법
              </div>
            </div>
            {/* 본문 내용 */}
            <div
              dangerouslySetInnerHTML={{ __html: post.htmlText }}
              ref={contentRef}
            ></div>
          </div>
          <OrderBar />
        </>
      )}
    </div>
  );
}
