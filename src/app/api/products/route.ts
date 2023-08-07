import { getProducts } from "@/service/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await getProducts();
    const products = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(products);
  } catch (error) {
    console.log("getProducts Error : ", error);
    return NextResponse.json(
      { message: "상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
