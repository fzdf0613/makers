import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getUserById } from "@/service/user";
import { User } from "@/customType/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserReviews } from "@/service/review";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "잘못된 요청 입니다." },
      { status: 400 }
    );
  }
  try {
    const userData = await getUserById(session.user.id);
    const reviewIds = (userData as User).review;

    if (reviewIds.length === 0) {
      return NextResponse.json([]);
    }
    const snapshot = await getUserReviews(reviewIds);
    const reviews = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json(reviews);
  } catch (error) {
    console.log("getUserReviews Error : ", error);
    return NextResponse.json(
      { message: "후기 내역 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
