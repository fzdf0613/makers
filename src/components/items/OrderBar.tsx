export default function OrderBar() {
  return (
    <div className="w-full h-[96px] pt-2 pb-8 fixed bottom-0 right-0 bg-white">
      <div className="mx-auto w-full h-full flex justify-between max-w-[640px] text-md font-bold text-white px-4">
        <div className="bg-[#1a1a1a] rounded-md w-[28%] flex justify-center items-center">
          선물하기
        </div>
        <div className="bg-[#ed554d] rounded-md ml-2 w-[72%] flex justify-center items-center">
          주문하기
        </div>
      </div>
    </div>
  );
}
