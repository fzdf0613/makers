import { uploadPostImage } from "@/service/storage";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  //getServerSession으로 로그인 유저 정보 가져오기

  const data = await req.formData();

  const file = data.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 이미지 업로드 후 url 받기
  const url = await uploadPostImage(file);
  return NextResponse.json(url);
}
