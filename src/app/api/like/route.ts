import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { addLike, removeLike } from "@/service/user";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return new Response("로그인을 해주세요.", { status: 401 });
  }

  const { productId, active } = await req.json();
  if (!productId || active == null) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const likeRequest = active ? addLike : removeLike;

  try {
    await likeRequest(user.id, productId);
    return NextResponse.json({ message: "좋아요 요청 성공." });
  } catch (error) {
    console.log("Like Request Error :", error);
    return NextResponse.json({ message: "좋아요 요청 실패." }, { status: 500 });
  }
}
