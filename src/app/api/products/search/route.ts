import { searchProducts } from "@/service/product";
import { NextRequest, NextResponse } from "next/server";
import { getFomattedProduct } from "@/util/productFormat";

export async function GET(req: NextRequest) {
  const json = await req.json();
  const keyWord = json.keyWord;
  try {
    const snapshot = await searchProducts(keyWord);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));
    return NextResponse.json(products);
  } catch (error) {
    console.log("searchProducts Error : ", error);
    return NextResponse.json(
      { message: "검색 상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
