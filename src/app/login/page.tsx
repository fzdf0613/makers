import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogInForm from "@/components/login/LogInForm";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function logInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex md:justify-center md:items-center w-full h-screen grow min-w-[320px]">
      <div className="flex flex-col w-full md:p-0 px-3">
        <h1 className="font-semibold text-3xl pb-10 mt-[50px] md:mt-0 mx-auto">
          Makers
        </h1>
        <LogInForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
