import { getLikeProducts } from "@/service/product";
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
    const likeProductIds = (userData as User).like;

    if (likeProductIds.length === 0) {
      return NextResponse.json([]);
    }

    const snapshot = await getLikeProducts(likeProductIds);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));

    return NextResponse.json(products);
  } catch (error) {
    console.log("getLikeProducts Error : ", error);
    return NextResponse.json(
      { message: "상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
