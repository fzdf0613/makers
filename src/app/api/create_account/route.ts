import { User } from "@/customType/user";
import { uploadProfileImageWithUserid } from "@/service/storage";
import { createUserByCredential, isExistingId } from "@/service/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const userid = data.get("userid")?.toString();
  const password = data.get("password")?.toString();
  const username = data.get("username")?.toString();

  //file 없는 경우 처리 분리 해야함
  const file = data.get("file") as File;
  if (!userid || !password || !username) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const isExistingUser = await isExistingId(userid);
  if (isExistingUser) {
    return NextResponse.json(
      { error: "이미 존재하는 아이디입니다." },
      { status: 400 }
    );
  }

  let url;
  // 이미지 업로드 후 url 받기
  if (file) {
    url = await uploadProfileImageWithUserid(userid, file);
  } else {
    url = "/images/defaultAvatar.png";
  }

  const createResult = await createUserByCredential(
    userid,
    password,
    username,
    url
  );

  if (createResult === null) {
    return NextResponse.json(
      { error: "계정 생성시 오류가 발생하였습니다." },
      { status: 500 }
    );
  }

  const { password: p, ...otherData } = createResult as User;
  console.log("create Result :", createResult);
  return NextResponse.json(createResult);
}
