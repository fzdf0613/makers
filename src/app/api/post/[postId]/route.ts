import { NextResponse, NextRequest } from "next/server";
import { getPost } from "@/service/post";

type Context = {
  params: {
    postId: string;
  };
};

export async function GET(_: NextRequest, { params: { postId } }: Context) {
  try {
    const snapshot = await getPost(postId);
    if (snapshot.exists()) {
      const post = snapshot.data();
      return NextResponse.json(post);
    } else {
      return NextResponse.json(undefined);
    }
  } catch (error) {
    console.log("getPost Error : ", error);
    return NextResponse.json(
      { message: "상품 포스트 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
