"use client";
import AnchorBar from "@/components/items/AnchorBar";
import BaseInfo from "@/components/items/BaseInfo";
import ItemImage from "@/components/items/ItemImage";
import ItemNavBar from "@/components/items/ItemNavBar";
import OrderBar from "@/components/items/OrderBar";
import OrderInfo from "@/components/items/OrderInfo";
import InquiryContainer from "@/components/items/InquiryContainer";
import ReviewContainer from "@/components/items/ReviewContainer";
import usePost from "@/hooks/post";
import { useProduct } from "@/hooks/product";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import SkeletonItemPage from "@/components/items/SkeletonItemPage";
import { useParams } from "next/navigation";

export default function PostContainer() {
  const params = useParams();
  const { data: session, status } = useSession();
  const [anchors, setAnchors] = useState<{ name: string; id: string }[]>();
  const navRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"상세정보" | "구매후기" | "제품문의">(
    "상세정보"
  );
  const { post } = usePost(params.itemId);
  const { product } = useProduct(params.itemId);

  const contentRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const elements = Array.from(document.querySelectorAll(".anchor"));
      setAnchors([
        { name: "요약", id: "summary" },
        ...elements.map((el) => {
          return { name: (el as HTMLImageElement).alt, id: el.id };
        }),
      ]);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/seen", {
        method: "PUT",
        body: JSON.stringify({ productId: params.itemId, isAdd: true }),
      });
    }
  }, [status, params.itemId]);

  useEffect(() => {
    if (!post) {
      return;
    }
    post.htmlText;
  }, [post]);

  if (!post || !product) {
    return <SkeletonItemPage />;
  }

  return (
    <div className="w-full">
      {post && product && (
        <>
          <ItemImage imageUrl={product.imageUrl} alt={product.name} />
          <BaseInfo
            name={product.name}
            price={product.price}
            productId={product.id}
          />
          <OrderInfo product={product} />
          <ItemNavBar
            tab={tab}
            setTab={setTab}
            navRef={navRef}
            reviewCount={post.reviewCount}
            inquiryCount={post.inquiryCount}
          />
          <div id="summary" className="invisible" />
          {tab === "상세정보" && (
            <div>
              {anchors && <AnchorBar anchors={anchors} />}
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.htmlText),
                }}
                ref={contentRef}
              ></div>
            </div>
          )}
          {tab === "구매후기" && (
            <ReviewContainer reviewCount={post.reviewCount} postId={post.id} />
          )}
          {tab === "제품문의" && (
            <InquiryContainer
              productId={product.id}
              inquiryCount={post.inquiryCount}
            />
          )}
          <Image
            src="/images/itemFooterImage.jpg"
            alt="item-footer"
            width={0}
            height={0}
            sizes="640"
            className="max-w-[640px] w-full h-auto mt-5"
          />
          <OrderBar post={post} product={product} />
        </>
      )}
    </div>
  );
}
