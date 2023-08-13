type Props = {
  isOverlap: boolean;
  isScrollDown: boolean;
  anchors: { name: string; y: number }[];
  activeAnchor: string;
};

export default function AnchorBar({
  isOverlap,
  isScrollDown,
  anchors,
  activeAnchor,
}: Props) {
  return (
    <div
      id="anchorList"
      className={`h-16 flex gap-2 py-3 px-4 sticky bg-white ${
        isOverlap ? "z-[5]" : "z-[4]"
      } ${isScrollDown ? "top-[53px]" : "top-[110px]"} ease-in duration-100`}
    >
      {anchors.map((anchor, i) => (
        <div
          key={i}
          className={`${
            activeAnchor === anchor.name ? "bg-[#1a1a1a] text-white" : ""
          } cursor-pointer px-4 border-neutral-200 border rounded-3xl h-10 flex justify-center items-center`}
          onClick={() => {
            window.scrollTo({
              top: anchor.y,
              behavior: "smooth",
            });
          }}
        >
          {anchor.name}
        </div>
      ))}
    </div>
  );
}
