import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { addSeenProduct, removeSeenProduct } from "@/service/user";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return new Response("로그인을 해주세요.", { status: 401 });
  }

  const { productId, isAdd } = await req.json();
  if (!productId || isAdd == undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const seenRequest = isAdd ? addSeenProduct : removeSeenProduct;

  try {
    await seenRequest(user.id, productId);
    return NextResponse.json({ message: "최근 본 목록 업데이트 성공." });
  } catch (error) {
    console.log("SeenList Request Error :", error);
    return NextResponse.json(
      { message: "최근 본 목록 업데이트 실패." },
      { status: 500 }
    );
  }
}
