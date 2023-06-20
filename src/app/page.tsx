import HomeCategoryBar from "@/components/home/HomeCategoryBar";
import HomeItem from "@/components/home/HomeItem";
import Dropdown from "@/components/ui/Dropdown";
import { DummyHomeItems } from "@/Dummy/dummydata";

export default function Home() {
  return (
    <section className="relative">
      <HomeCategoryBar />
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
