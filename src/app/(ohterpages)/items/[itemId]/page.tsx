"use client";
import AnchorBar from "@/components/items/AnchorBar";
import BaseInfo from "@/components/items/BaseInfo";
import ItemImage from "@/components/items/ItemImage";
import ItemNavBar from "@/components/items/ItemNavBar";
import OrderBar from "@/components/items/OrderBar";
import OrderInfo from "@/components/items/OrderInfo";
import Qna from "@/components/items/Qna";
import Review from "@/components/items/Review";
import { useScrollYContext } from "@/context/ScrollYContext";
import usePost from "@/hooks/post";
import useProduct from "@/hooks/product";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function ItemPage({ params }: { params: { itemId: string } }) {
  const [activeAnchor, setActiveAnchor] = useState<string>("");
  const [anchors, setAnchors] = useState<{ name: string; y: number }[]>();
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isScrollDown, Y } = useScrollYContext();
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

  useLayoutEffect(() => {
    const elements = document.getElementsByClassName("anchor");
    if (!elements || !contentRef.current) {
      return;
    }
    let l = [
      {
        name: "요약",
        y: contentRef.current.getBoundingClientRect().top + Y - 121,
      },
    ];
    for (let i = 0; i < elements.length; i++) {
      if (!elements) {
        return;
      }
      const el = elements.item(i);
      if (!el) {
        return;
      }
      const anchor = {
        name: (el as HTMLImageElement).alt,
        y: el.getBoundingClientRect().top + Y - 121,
      };
      l.push(anchor);
    }
    setAnchors(l);
  }, [post, Y]);

  useLayoutEffect(() => {
    if (!anchors) {
      return;
    }
    for (let i = 0; i < anchors.length; i++) {
      if (i == 0 && Y < anchors[i].y - 10) {
        setActiveAnchor("");
        return;
      }
      if (Y < anchors[i].y - 10) {
        setActiveAnchor(anchors[i - 1].name);
        return;
      }
    }
    setActiveAnchor(anchors[anchors.length - 1].name);
  }, [Y, anchors]);

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
          {tab === "상세정보" && (
            <div>
              {anchors && (
                <AnchorBar
                  isOverlap={isOverlap}
                  isScrollDown={isScrollDown}
                  anchors={anchors}
                  activeAnchor={activeAnchor}
                />
              )}
              <div
                dangerouslySetInnerHTML={{ __html: post.htmlText }}
                ref={contentRef}
              ></div>
            </div>
          )}
          {tab === "구매후기" && <Review />}
          {tab === "제품문의" && <Qna />}
          <OrderBar />
        </>
      )}
    </div>
  );
}
