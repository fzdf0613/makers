import { categories } from "@/constants/categories";
import { getCategoryProducts } from "@/service/product";
import { NextResponse, NextRequest } from "next/server";

type Context = {
  params: {
    category: string;
  };
};

export async function GET(_: NextRequest, { params: { category } }: Context) {
  if (!category) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const categoryQueryNames = getCategoryQueryNames(category);

  if (!categoryQueryNames) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  try {
    const snapshot = await getCategoryProducts(categoryQueryNames);
    const products = snapshot.docs.map((doc) => doc.data());
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    console.log(randomProduct);
    return NextResponse.json(randomProduct);
  } catch (error) {
    console.log("getCategoryProducts Error : ", error);
    return NextResponse.json(
      { message: "QuickLink 상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}

function getCategoryQueryNames(category: string) {
  const filtered = categories.find((item) => item.value === category);
  if (!filtered || !filtered.subcategories) {
    return null;
  }
  return filtered.title;
}
