import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewFooter from "@/components/review/ReviewFooter";
import ReviewHeader from "@/components/review/ReviewHeader";
import ReviewWriteBox from "@/components/review/ReviewWriteBox";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ReviewWritePage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <main className="w-full max-w-[640px] flex flex-col">
      <ReviewHeader />
      <ReviewWriteBox userId={user.id} orderId={searchParams.orderId} />
      <ReviewFooter />
    </main>
  );
}
