import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SeenList from "@/components/seen/SeenList";

export default async function SeenPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="mt-[95px] flex flex-col items-center justify-center h-[300px]">
        <strong>최근 본 상품을 조회하려면 로그인이 필요합니다.</strong>
      </div>
    );
  }

  return (
    <div className="mt-[95px] px-4">
      <SeenList />
    </div>
  );
}
