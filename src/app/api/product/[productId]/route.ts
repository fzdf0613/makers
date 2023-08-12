import { NextResponse, NextRequest } from "next/server";
import { getProduct } from "@/service/product";

type Context = {
  params: {
    productId: string;
  };
};

export async function GET(_: NextRequest, { params: { productId } }: Context) {
  try {
    const snapshot = await getProduct(productId);
    if (snapshot.exists()) {
      const product = snapshot.data();
      return NextResponse.json(product);
    } else {
      return NextResponse.json(undefined);
    }
  } catch (error) {
    console.log("getProduct Error : ", error);
    return NextResponse.json(
      { message: "상품 포스트 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}
