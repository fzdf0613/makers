import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyInquiryList from "@/components/my/inquiry/MyInquiryList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyInquiryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/`);
  }

  return <MyInquiryList />;
}
