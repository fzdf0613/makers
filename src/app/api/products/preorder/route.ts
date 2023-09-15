import { getPreorderProducts } from "@/service/product";
import { NextResponse, NextRequest } from "next/server";
import { getFomattedProduct } from "@/util/productFormat";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor");

  try {
    const snapshot = await getPreorderProducts(cursor ?? undefined);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));
    return NextResponse.json(products);
  } catch (error) {
    console.log("getPreorderProducts Error : ", error);
    return NextResponse.json(
      { message: "오픈예정 상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
