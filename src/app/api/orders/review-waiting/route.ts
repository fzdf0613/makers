import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getUserById } from "@/service/user";
import { User } from "@/customType/user";
import { getReviewWatingOrders } from "@/service/order";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    const orderIds = (userData as User).ordered;

    if (orderIds.length === 0) {
      return NextResponse.json([]);
    }

    const snapshot = await getReviewWatingOrders(orderIds);
    const orders = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json(orders);
  } catch (error) {
    console.log("getReviewWatingOrders Error : ", error);
    return NextResponse.json(
      { message: "후기 작성 대기 목록 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
