import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import HomeItem from "@/components/home/HomeItem";
import Dropdown from "@/components/ui/Dropdown";
import { DummyHomeItems } from "@/Dummy/dummydata";

export default function Home() {
  return (
    <section className="relative pt-[58px] w-full">
      <div className="fixed top-[95px] w-full max-w-[640px] z-10 bg-white">
        <HomeCategoryBar />
      </div>
      <div className="pb-3">
        <Dropdown />
      </div>
      <div>
        {DummyHomeItems.map((item) => (
          <HomeItem item={item} />
        ))}
      </div>
    </section>
  );
}
