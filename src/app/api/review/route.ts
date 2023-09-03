import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUUID } from "@/util/uuid";
import { addReview } from "@/service/review";
import { addReviewToUser } from "@/service/user";
import { uploadPostImage } from "@/service/storage";
import { updateReviewState } from "@/service/order";
import { increaseReviewCount } from "@/service/post";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!session) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }

  const data = await req.formData();
  const reviewData = data.get("review");
  const orderId = data.get("orderId");
  const file = data.get("file") as File;

  if (!reviewData || !orderId) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  let imageUrl;
  if (file) {
    try {
      imageUrl = await uploadPostImage(file);
    } catch (e) {
      console.log("upload image error :", e);
      return NextResponse.json(
        {
          error:
            "구매 후기 등록이 실패하였습니다. 잠시 후에 다시 시도해주세요.",
        },
        { status: 500 }
      );
    }
  }

  const review = JSON.parse(reviewData as string);
  const id = getUUID();

  const newReview = {
    ...review,
    id,
    imageUrl: imageUrl ?? "",
    username: user.username,
    userImage: user.image,
  };

  try {
    const result = await Promise.all([
      addReview(id, newReview),
      addReviewToUser(review.userId, id),
      updateReviewState(orderId as string),
      increaseReviewCount(review.productId),
    ]);
  } catch (e) {
    console.log("addReview Error : ", e);
    return NextResponse.json(
      { error: "잠시후에 다시 시도해주세요." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "리뷰 등록 성공" });
}
