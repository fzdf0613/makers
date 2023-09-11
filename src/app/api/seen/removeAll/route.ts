import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { removeSeenProductAll } from "@/service/user";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return new Response("로그인을 해주세요.", { status: 401 });
  }

  try {
    await removeSeenProductAll(user.id);
    return NextResponse.json({ message: "최근 본 목록 전체 삭제 성공." });
  } catch (error) {
    console.log("Del SeenList All Request Error :", error);
    return NextResponse.json(
      { message: "최근 본 목록 전체 삭제 실패." },
      { status: 500 }
    );
  }
}
