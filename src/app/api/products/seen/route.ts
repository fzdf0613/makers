import { getSeenProducts } from "@/service/product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserById } from "@/service/user";
import { User } from "@/customType/user";
import { getFomattedProduct } from "@/util/productFormat";

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
    const seenProductIds = (userData as User).seen;

    if (seenProductIds.length === 0) {
      return NextResponse.json([]);
    }

    const snapshot = await getSeenProducts(seenProductIds);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));

    const reArranged = products.sort((productA, productB) => {
      const index1 = seenProductIds.indexOf(productA.id);
      const index2 = seenProductIds.indexOf(productB.id);
      return index1 - index2;
    });

    return NextResponse.json(reArranged);
  } catch (error) {
    console.log("getSeenProducts Error : ", error);
    return NextResponse.json(
      { message: "최근 본 상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
