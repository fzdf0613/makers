import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyLikeList from "@/components/my/like/MyLikeList";

export default async function MyLikePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/`);
  }

  return <MyLikeList />;
}
