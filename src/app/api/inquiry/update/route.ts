import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { addAnswer, removeAnswer } from "@/service/inquiry";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user || !user.isAdmin) {
    return new Response("권한이 없습니다.", { status: 400 });
  }

  const { inquiryId, answer, isAdd } = await req.json();
  if (!inquiryId || !answer || isAdd == undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }
  try {
    if (isAdd) {
      await addAnswer(inquiryId, answer);
      return NextResponse.json({ message: "문의 답변 등록 성공." });
    } else {
      await removeAnswer(inquiryId);
      return NextResponse.json({ message: "문의 답변 삭제 성공." });
    }
  } catch (error) {
    console.log("SeenList Request Error :", error);
    return NextResponse.json(
      { message: "최근 본 목록 업데이트 실패." },
      { status: 500 }
    );
  }
}
