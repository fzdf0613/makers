import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { addSearchKeyWord, removeSearchKeyWord } from "@/service/user";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return new Response("로그인을 해주세요.", { status: 401 });
  }

  const { keyWord, isAdd } = await req.json();
  if (!keyWord || isAdd == undefined) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  const searchRequest = isAdd ? addSearchKeyWord : removeSearchKeyWord;

  try {
    await searchRequest(user.id, keyWord);
    return NextResponse.json({ message: "검색 목록 업데이트 성공." });
  } catch (error) {
    console.log("SearchList Request Error :", error);
    return NextResponse.json(
      { message: "검색 목록 업데이트 실패." },
      { status: 500 }
    );
  }
}
