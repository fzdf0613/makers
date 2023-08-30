import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addOrder } from "@/service/order";
import { getUUID } from "@/util/uuid";
import { addOrdered } from "@/service/user";
import { updateItemCount } from "@/service/product";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }

  const data = await req.formData();
  const orderData = data.get("order");

  if (!orderData) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const order = JSON.parse(orderData as string);
  const id = getUUID();

  try {
    const result = await Promise.all([
      addOrder(id, order),
      addOrdered(order.userId, id),
      updateItemCount(order.productId, order.count),
    ]);
    console.log("addOrdered Result : ", result[1]);
  } catch (e) {
    console.log("addOrder Error : ", e);
    return NextResponse.json(
      { error: "잠시후에 다시 시도해주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "상품 등록 성공" });
}
