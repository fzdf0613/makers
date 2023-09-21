import MyReviewList from "@/components/my/review/MyReviewList";
import ReviewTab from "@/components/my/review/ReviewTab";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyReviewPage({
  searchParams,
}: {
  searchParams: { location: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/`);
  }

  return (
    <>
      <ReviewTab tab={searchParams.location} />
      <MyReviewList tab={searchParams.location} />
    </>
  );
}
