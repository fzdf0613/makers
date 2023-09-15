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

export async function getPostReviews(postId: string) {
  const reviewsQuery = query(
    collection(db, "reviews"),
    where("productId", "==", postId),
    limit(10)
  );
  return getDocs(reviewsQuery);
}
