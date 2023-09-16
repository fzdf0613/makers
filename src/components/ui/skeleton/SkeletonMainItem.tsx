import SkeletonDescription from "./SkeletonDescription";
import SkeletonHeading from "./SkeletonHeading";

export default function SkeletonMainItem() {
  return (
    <div className="mb-9">
      <div className="relative w-full pb-[56.25%] bg-[#efefef]" />
      <div className="p-4 flex flex-col">
        <SkeletonHeading />
        <SkeletonDescription />
      </div>
    </div>
  );
}
