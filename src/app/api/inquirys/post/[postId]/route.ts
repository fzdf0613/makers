import { NextResponse, NextRequest } from "next/server";
import { getPostInquirys } from "@/service/inquiry";

type Context = {
  params: {
    postId: string;
  };
};

export async function GET(_: NextRequest, { params: { postId } }: Context) {
  try {
    const snapshot = await getPostInquirys(postId);
    const inquirys = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(inquirys);
  } catch (error) {
    console.log("getPostInquirys Error : ", error);
    return NextResponse.json(
      { message: "문의 내역 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
