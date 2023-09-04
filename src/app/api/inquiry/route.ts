import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUUID } from "@/util/uuid";
import { addInquiryToUser } from "@/service/user";
import { increaseInquiryCount } from "@/service/post";
import { addInquiry } from "@/service/inquiry";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!session) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }

  const data = await req.formData();
  const inquiryData = data.get("inquiry");

  if (!inquiryData) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const inquiry = JSON.parse(inquiryData as string);
  const id = getUUID();

  const newInquiry = {
    id,
    ...inquiry,
    username: user.username,
    userId: user.id,
    answer: "",
  };

  try {
    const result = await Promise.all([
      addInquiry(id, newInquiry),
      addInquiryToUser(user.id, id),
      increaseInquiryCount(inquiry.productId),
    ]);
  } catch (e) {
    console.log("addInquiry Error : ", e);
    return NextResponse.json(
      { error: "잠시후에 다시 시도해주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "문의 등록 성공" });
}
