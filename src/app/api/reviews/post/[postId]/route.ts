import { NextResponse, NextRequest } from "next/server";
import { getPostReviews } from "@/service/review";

type Context = {
  params: {
    postId: string;
  };
};

export async function GET(_: NextRequest, { params: { postId } }: Context) {
  try {
    const snapshot = await getPostReviews(postId);
    const reviews = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(reviews);
  } catch (error) {
    console.log("getPostReviews Error : ", error);
    return NextResponse.json(
      { message: "상품 구매후기 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
