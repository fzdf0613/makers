import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnswerList from "@/components/answer/AnswerList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnswerPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user.isAdmin) {
    redirect("/");
  }
  return <AnswerList />;
}
