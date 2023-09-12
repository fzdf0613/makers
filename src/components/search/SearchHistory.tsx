import KeyWord from "./KeyWord";

type Props = {
  searchList: string[];
  handleKeyWordClick: (keyWord: string) => void;
  handleKeyWordDelete: (keyWord: string) => void;
};

export default function SearchHistory({
  searchList,
  handleKeyWordClick,
  handleKeyWordDelete,
}: Props) {
  return (
    <div className="mt-[50px]">
      <strong className="text-[18px]">최근 검색어</strong>
      <div className="mt-2">
        {searchList.length !== 0 ? (
          <ul className="flex flex-wrap" id="search-item-list">
            {searchList.map((keyWord, i) => (
              <KeyWord
                key={`${keyWord}_${i}`}
                keyWord={keyWord}
                handleKeyWordClick={handleKeyWordClick}
                handleKeyWordDelete={handleKeyWordDelete}
              />
            ))}
          </ul>
        ) : (
          <div className="py-4 text-[#6c6c6c] text-center">
            최근 검색하신 제품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
