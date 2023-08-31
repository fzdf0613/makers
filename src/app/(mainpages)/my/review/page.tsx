import MyReviewItem from "@/components/my/review/MyReviewItem";
import ReviewTab from "@/components/my/review/ReviewTab";

export default function MyReviewPage() {
  return (
    <>
      <ReviewTab />
      <div className="bg-[#ededed] pb-2.5 flex flex-col">
        <MyReviewItem />
        <MyReviewItem />
        <MyReviewItem />
        <MyReviewItem />
      </div>
    </>
  );
}
