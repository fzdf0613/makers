"use client";
import { useState, MouseEvent, useRef } from "react";
import CustomSearchBox from "@/components/search/CustomSearchBox";
import { searchClient } from "@/service/algolia";
import { InstantSearch, Configure } from "react-instantsearch";
import useCurrentUser from "@/hooks/user";
import SearchItemList from "@/components/search/SearchItemList";

export default function SearchPage() {
  const { user } = useCurrentUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [viewOnOrder, setViewOnOrder] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const handleContainerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.id === "search-item-list" ||
      target.id === "search-input" ||
      target.classList.contains("keyword-close")
    ) {
      inputRef.current?.focus();
      setIsInputFocused(true);
    } else {
      inputRef.current?.blur();
      setIsInputFocused(false);
    }
  };

  const toggleFilter = () => {
    setViewOnOrder((prev) => !prev);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <Configure
        filters={
          viewOnOrder ? `orderEndTime > ${new Date().getTime()}` : undefined
        }
      />
      <div onClick={handleContainerClick}>
        <div className="w-full max-w-[640px] px-4 pt-[30px] pb-5 fixed top-[55px]">
          <CustomSearchBox
            inputRef={inputRef}
            user={user}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
            setIsSearched={setIsSearched}
          />
        </div>
        <div className="bg-white min-h-[calc(100vh-100px)] mt-[102px] px-4">
          {!isInputFocused && (
            <SearchItemList
              isSearched={isSearched}
              viewOnOrder={viewOnOrder}
              toggleOnOrder={toggleFilter}
            />
          )}
        </div>
      </div>
    </InstantSearch>
  );
}
