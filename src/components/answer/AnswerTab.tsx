type Props = {
  tab: "answered" | "waiting";
  handleTabClick: (tab: "answered" | "waiting") => void;
};

export default function AnswerTab({ tab, handleTabClick }: Props) {
  return (
    <div className="flex text-sm w-full border-y border-[#dee2e6] -mt-1">
      <button
        className="w-1/2 text-center border-[#dee2e6] border-r"
        onClick={() => {
          handleTabClick("answered");
        }}
      >
        <div
          className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
            tab === "answered" && "border-b-2 border-black bg-white text-black"
          }`}
        >
          답변 목록
        </div>
      </button>
      <button
        className="w-1/2 text-center"
        onClick={() => {
          handleTabClick("waiting");
        }}
      >
        <div
          className={`py-4 bg-[#fafafa] text-[#9b9b9b] ${
            tab === "waiting" && "border-b-2 border-black bg-white text-black"
          }`}
        >
          답변 대기 목록
        </div>
      </button>
    </div>
  );
}
