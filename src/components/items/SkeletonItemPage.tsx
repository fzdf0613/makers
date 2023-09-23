import SkeletonDescription from "../ui/skeleton/SkeletonDescription";
import SkeletonHeading from "../ui/skeleton/SkeletonHeading";
import SkeletonLine from "../ui/skeleton/SkeletonLine";

export default function SkeletonItemPage() {
  return (
    <div className="w-full">
      <div className="w-full h-[calc(55vw+16px)] sm:h-[460px] relative bg-[#efefef]" />
      <div className="rounded-t-2xl p-5 -translate-y-[10px] flex flex-col gap-1">
        <SkeletonHeading />
        <SkeletonLine />
      </div>
      <div className="pt-[30px] px-4 pb-10">
        <SkeletonDescription />
        <SkeletonLine />
      </div>
      <div className="flex flex-col gap-2 px-4 mb-5">
        <SkeletonHeading />
        <SkeletonHeading />
        <SkeletonHeading />
      </div>
      <div className="flex gap-2 justify-between px-10">
        <div className="w-[60px] h-[32px] rounded-md bg-[#efefef]" />
        <div className="w-[60px] h-[32px] rounded-md bg-[#efefef]" />
        <div className="w-[60px] h-[32px] rounded-md bg-[#efefef]" />
      </div>
      <div className="flex flex-col gap-5">
        <SkeletonDescription />
        <SkeletonDescription />
        <SkeletonDescription />
      </div>
    </div>
  );
}
