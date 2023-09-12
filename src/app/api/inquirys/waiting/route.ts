import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getWaitingInquirys } from "@/service/inquiry";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "잘못된 요청 입니다." },
      { status: 400 }
    );
  }
  const user = session.user;

  if (!user || !user.isAdmin) {
    return NextResponse.json(
      { message: "잘못된 요청 입니다." },
      { status: 400 }
    );
  }

  try {
    const snapshot = await getWaitingInquirys();
    const inquirys = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(inquirys);
  } catch (error) {
    console.log("getWaitingInquirys Error : ", error);
    return NextResponse.json(
      { message: "답변 대기 목록 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
