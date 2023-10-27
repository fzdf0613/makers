"use client";
import {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import CloseIcon from "@/components/ui/icons/CloseIcon";
import useCurrentUser from "@/hooks/user";
import SearchHistory from "./SearchHistory";
import { UserData } from "@/customType/user";

type Props = UseSearchBoxProps & {
  inputRef: RefObject<HTMLInputElement>;
  user?: UserData;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setIsSearched: Dispatch<SetStateAction<boolean>>;
};

export default function CustomSearchBox({
  inputRef,
  isInputFocused,
  setIsInputFocused,
  setIsSearched,
  user,
  ...props
}: Props) {
  const [text, setText] = useState("");
  const [tempHistory, setTempHistory] = useState<string[]>([]);
  const { updateSearchHistory } = useCurrentUser();
  const { refine } = useSearchBox(props);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    if (user) {
      updateSearchHistory(text, true);
    } else {
      setTempHistory((prev) => [text, ...prev.filter((item) => item !== text)]);
    }
    refine(text);
  };

  const handleChange = () => {
    if (!inputRef.current) {
      return;
    }
    setText(inputRef.current.value);
  };

  const handleKeyWordClick = (keyWord: string) => {
    setText(keyWord);
    refine(keyWord);
    setIsSearched(true);
    if (user) {
      updateSearchHistory(keyWord, true);
    } else {
      setTempHistory((prev) => [
        keyWord,
        ...prev.filter((item) => item !== keyWord),
      ]);
    }
  };

  const handleKeyWordDelete = (keyWord: string) => {
    setIsSearched(false);
    if (user) {
      updateSearchHistory(keyWord, false);
    } else {
      setTempHistory((prev) => {
        return prev.filter((item) => item !== keyWord);
      });
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <button>
          <SearchIcon className="absolute top-[15px] left-[18px]" />
        </button>
        <input
          id="search-input"
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="어떤 제품을 찾으시나요?"
          className="w-full py-4.5 pl-14 pr-12 caret-[#db635d] h-[50px] text-sm border border-[#6c6c6c] rounded-[4px] outline-none"
        ></input>
      </form>
      {text && (
        <button
          className="rounded-full w-5 h-5 bg-[#d5d5d5] top-[15.5px] right-[18px] absolute flex items-center justify-center"
          onClick={() => {
            setIsSearched(false);
            setText("");
            inputRef.current?.focus();
          }}
        >
          <CloseIcon className="text-white" />
        </button>
      )}
      {isInputFocused && (
        <SearchHistory
          handleKeyWordClick={handleKeyWordClick}
          handleKeyWordDelete={handleKeyWordDelete}
          searchList={user ? user?.search || [] : tempHistory}
        />
      )}
    </div>
  );
}
