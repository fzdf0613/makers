import { db } from "@/service/firebase";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  limit,
  getDocs,
  documentId,
  orderBy,
  getDoc,
  startAfter,
} from "firebase/firestore";

export async function addReview(id: string, review: any) {
  return setDoc(doc(db, "reviews", id), review);
}

export async function getUserReviews(reviewIds: string[]) {
  const reviewsQuery = query(
    collection(db, "reviews"),
    where(documentId(), "in", reviewIds),
    orderBy(documentId())
  );
  return getDocs(reviewsQuery);
}

export async function getPostReviews(postId: string, cursor?: string) {
  const reviewsQuery = query(
    collection(db, "reviews"),
    where("productId", "==", postId),
    limit(10)
  );
  if (cursor) {
    const cursorRef = doc(db, "reviews", cursor);
    const cursorDoc = await getDoc(cursorRef);
    if (!cursorDoc.exists()) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    const queryWithCursor = query(reviewsQuery, startAfter(cursorDoc));
    return getDocs(queryWithCursor);
  }
  return getDocs(reviewsQuery);
}
