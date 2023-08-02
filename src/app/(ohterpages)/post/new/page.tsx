import ProductUploadForm from "@/components/post/ProductUploadForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PostUploadPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user.isAdmin) {
    redirect("/");
  }
  return <ProductUploadForm />;
}
