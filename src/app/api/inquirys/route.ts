import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getInquirys } from "@/service/inquiry";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "잘못된 요청 입니다." },
      { status: 400 }
    );
  }

  try {
    const snapshot = await getInquirys(session.user.id);
    const inquirys = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json(inquirys);
  } catch (error) {
    console.log("getInquirys Error : ", error);
    return NextResponse.json(
      { message: "문의 내역 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
