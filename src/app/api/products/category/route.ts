import { categories, subcategories } from "@/constants/categories";
import { getProductsByFilter } from "@/service/product";
import { getFomattedProduct } from "@/util/productFormat";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const index = req.nextUrl.searchParams.get("subcategory");
  const sort = req.nextUrl.searchParams.get("sort");

  if (!category || !index || !sort) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  let categoryQueryNames;

  if (category === "all") {
    categoryQueryNames = { category: "all", subcategory: "all" };
  } else {
    categoryQueryNames = getCategoryQueryNames(category, parseInt(index));
  }

  if (!categoryQueryNames) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  const filter = { ...categoryQueryNames, sort };

  try {
    const snapshot = await getProductsByFilter(filter);
    const products = snapshot.docs.map((doc) => getFomattedProduct(doc.data()));
    return NextResponse.json(products);
  } catch (error) {
    console.log("getProductsByFilter Error : ", error);
    return NextResponse.json(
      { message: "상품 불러오기에 실패하였습니다." },
      { status: 500 }
    );
  }
}

function getCategoryQueryNames(category: string, index: number) {
  const filtered = categories.find((item) => item.value === category);
  if (!filtered || !filtered.subcategories) {
    return null;
  }
  return {
    category: filtered!.title,
    subcategory: filtered.subcategories[index],
  };
}
