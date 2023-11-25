import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyOrderList from "@/components/my/order/MyOrderList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyOrderPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/`);
  }

  return <MyOrderList />;
}
