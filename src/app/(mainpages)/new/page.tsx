"use client";
import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import NewItemList from "@/components/home/new/NewItemList";
import { useScrollYContext } from "@/context/ScrollYContext";

// export default function NewPage() {
//   const { isScrollDown } = useScrollYContext();

//   return (
//     <section className="relative pt-[153px] w-full">
//       <div
//         className={`fixed z-30 ${
//           isScrollDown ? "top-[55px]" : "top-[95px]"
//         } w-full max-w-[640px] z-10 bg-white ease-in duration-100`}
//       >
//         <HomeCategoryBar />
//       </div>
//       <div className="mt-10 mb-4">
//         <span className="font-bold text-xl">발견, 이번 주 신제품</span>
//         <div className="mt-1 text-sm text-[#6c6c6c]">
//           <time>08. 14 (월)</time>
//           {" - "}
//           <time>08. 20 (일)</time>
//         </div>
//       </div>
//       <NewItemList />
//     </section>
//   );
// }

export default function NewPage() {
  return (
    <>
      <div className="mt-10 mb-4">
        <span className="font-bold text-xl">발견, 이번 주 신제품</span>
        <div className="mt-1 text-sm text-[#6c6c6c]">
          <time>08. 14 (월)</time>
          {" - "}
          <time>08. 20 (일)</time>
        </div>
      </div>
      <NewItemList />
    </>
  );
}
