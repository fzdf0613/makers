import { NextResponse, NextRequest } from "next/server";
import { getOrder } from "@/service/order";

type Context = {
  params: {
    orderId: string;
  };
};

export async function GET(_: NextRequest, { params: { orderId } }: Context) {
  try {
    const snapshot = await getOrder(orderId);
    if (snapshot.exists()) {
      const order = snapshot.data();
      return NextResponse.json(order);
    } else {
      console.log("snapshot not exist(getOrder) :", snapshot);
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("getOrder Error : ", error);
    return NextResponse.json(
      { message: "주먼 정보 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
