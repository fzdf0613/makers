"use client";
import CloseIcon from "@/components/ui/icons/CloseIcon";

type Props = {
  keyWord: string;
  handleKeyWordClick: (keyWord: string) => void;
  handleKeyWordDelete: (keyWord: string) => void;
};

export default function KeyWord({
  keyWord,
  handleKeyWordClick,
  handleKeyWordDelete,
}: Props) {
  return (
    <li className="mt-2 max-w-[250px] cursor-pointer flex items-center w-fit mr-2.5 relative py-[9px] px-4 text-[13px]  rounded-[32px] border border-[#ededed]">
      <button
        className="leading-3 text-ellipsis overflow-hidden whitespace-nowrap"
        onClick={() => {
          handleKeyWordClick(keyWord);
        }}
      >
        {keyWord}
      </button>
      <button
        className="w-[18px] h-[18px] ml-1 keyword-close"
        onClick={() => {
          handleKeyWordDelete(keyWord);
        }}
      >
        <CloseIcon className="w-full h-full text-neutral-400 pointer-events-none" />
      </button>
    </li>
  );
}
