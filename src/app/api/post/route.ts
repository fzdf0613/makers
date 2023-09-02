import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addProduct } from "@/service/product";
import { addPost } from "@/service/post";
import { uploadPostImage } from "@/service/storage";
import { parseOptions, parseOptionsPrices } from "@/util/parse";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }

  const data = await req.formData();
  const file = data.get("file") as File;
  const postData = data.get("post");
  const productData = data.get("product");

  if (!postData || !productData || !file) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  let imageUrl;
  try {
    imageUrl = await uploadPostImage(file);
  } catch (e) {
    return NextResponse.json(
      { error: "상품 이미지 등록이 실패하였습니다." },
      { status: 500 }
    );
  }

  const post = JSON.parse(postData as string);
  const product = JSON.parse(productData as string);
  console.log("Parsed Post :", post);
  console.log("Parsed Product :", product);

  let itemOptions: string[] = [];
  let optionsPrices: number[] = [];

  if (post.itemOptions && post.optionsPrices) {
    const parsedOptions = parseOptions(post.itemOptions);
    const parsedPrices = parseOptionsPrices(post.optionsPrices);
    console.log("parsedPrices : ", parsedPrices);
    if (!parsedOptions || !parsedPrices) {
      return NextResponse.json(
        { error: "상품 옵션 설정이 올바르지 않습니다." },
        { status: 400 }
      );
    }
    if (parsedOptions.length !== parsedPrices.length) {
      return NextResponse.json(
        { error: "상품 옵션 설정이 올바르지 않습니다." },
        { status: 400 }
      );
    }
    itemOptions = parsedOptions;
    optionsPrices = parsedPrices;
  }

  const newPost = {
    imageUrl,
    itemOptions,
    optionsPrices,
    inquiryCount: 0,
    reviewCount: 0,
    ...post,
  };
  const newProduct = {
    ...product,
    imageUrl,
    currentOrderCount: 0,
    orderUserCount: 0,
    likeCount: 0,
    itemCount: parseInt(product.itemCount),
    price: parseInt(product.price),
  };

  try {
    await Promise.all([addPost(newPost), addProduct(newProduct)]);
  } catch (e) {
    return NextResponse.json(
      { error: "상품 추가 시 오류가 발생하였습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "상품 등록 성공" });
}
