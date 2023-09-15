import { NextResponse, NextRequest } from "next/server";
import { getFomattedProduct } from "@/util/productFormat";
import { getNewProducts } from "@/service/product";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor");

  try {
    const snapshot = await getNewProducts(cursor ?? undefined);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));
    return NextResponse.json(products);
  } catch (error) {
    console.log("getNewProducts Error : ", error);
    return NextResponse.json(
      { message: "상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
