import SkeletonTitle from "@/components/ui/skeleton/SkeletonTitle";
import SkeletonMainItem from "./SkeletonMainItem";

export default function SkeletonMainPage() {
  return (
    <div>
      <SkeletonTitle />
      <section>
        <SkeletonMainItem />
        <SkeletonMainItem />
      </section>
    </div>
  );
}
