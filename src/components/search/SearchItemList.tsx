"use client";
import { useState, useEffect, useRef } from "react";
import { useInfiniteHits, UseInfiniteHitsProps } from "react-instantsearch";
import SearchItem from "./SearchItem";
import CheckIcon from "../ui/icons/CheckIcon";

type Props = UseInfiniteHitsProps & {
  isSearched: boolean;
  viewOnOrder: boolean;
  toggleOnOrder: () => void;
};

export default function SearchItemList({
  isSearched,
  viewOnOrder,
  toggleOnOrder,
  ...props
}: Props) {
  const sentinelRef = useRef(null);
  const { hits, showMore, isLastPage } = useInfiniteHits(props);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <section>
      {hits.length !== 0 && (
        <div className="pb-4 text-[13px] flex justify-between items-center border-b border-[#ededed]">
          <div>
            <strong>{hits.length}개</strong>의 검색 결과
          </div>
          <button
            onClick={toggleOnOrder}
            className={`border border-[#ededed] px-2 py-1.5 flex items-center rounded-[2px] ${
              viewOnOrder ? "bg-black text-white" : ""
            }`}
          >
            <CheckIcon className="text-[#9b9b9b]" />
            <span className="ml-1">주문 중인 제품</span>
          </button>
        </div>
      )}
      <div>
        <ul>
          {hits.map((product: any) => (
            <SearchItem key={product.id} product={product} />
          ))}
          {hits.length === 0 && isSearched && (
            <div className="py-[50px] text-[#6c6c6c] text-[13px] text-center">
              검색결과가 없습니다.
            </div>
          )}
          <li ref={sentinelRef} aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
