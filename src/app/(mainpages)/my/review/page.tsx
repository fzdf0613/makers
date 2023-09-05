import MyReviewList from "@/components/my/review/MyReviewList";
import ReviewTab from "@/components/my/review/ReviewTab";

export default function MyReviewPage({
  searchParams,
}: {
  searchParams: { location: string };
}) {
  return (
    <>
      <ReviewTab tab={searchParams.location} />
      <MyReviewList tab={searchParams.location} />
    </>
  );
}
