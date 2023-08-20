import Image from "next/image";
import Description from "@/components/ui/Description";

export default function QuickLinkCard() {
  return (
    <div className="px-4 pt-6 pb-12 bg-[#fafafa]">
      <div className="relative pb-[61.2244%] mb-4">
        <Image
          className="object-cover"
          src="/images/defaultAvatar.png"
          alt="quick-link-image"
          fill
        />
      </div>
      <div className="text-xl font-bold">밀탑의 얼려 먹는 밀크 빙수</div>
      <Description
        text={
          "100% 국내산 1급 A원유로 만들어 더욱 고소하고 담백합니다. 실온에서 보관하며, 섭취 하루 전에만 냉동고에 두면 되죠. 꽝꽝 얼었다면 전자레인지에 해동하세요. 팥이나 과일을 얹으면 더 풍성해집니다."
        }
      />
    </div>
  );
}
