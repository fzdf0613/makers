import { NextResponse, NextRequest } from "next/server";
import { getPostInquirys } from "@/service/inquiry";

type Context = {
  params: {
    postId: string;
  };
};

export async function GET(req: NextRequest, { params: { postId } }: Context) {
  const cursor = req.nextUrl.searchParams.get("cursor");

  try {
    const snapshot = await getPostInquirys(postId, cursor ?? undefined);
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
