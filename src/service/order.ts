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
  getDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

export async function addOrder(id: string, order: any) {
  return setDoc(doc(db, "orders", id), order);
}

export async function getOrder(orderId: string) {
  const orderRef = doc(db, "orders", orderId);
  return getDoc(orderRef);
}

export async function getPost(postId: string) {
  const postRef = doc(db, "posts", postId);
  return getDoc(postRef);
}

export async function getOrders(orderIds: string[]) {
  const ordersQuery = query(
    collection(db, "orders"),
    where(documentId(), "in", orderIds)
  );
  return getDocs(ordersQuery);
}

export async function getReviewWatingOrders(orderIds: string[]) {
  const ordersQuery = query(
    collection(db, "orders"),
    where(documentId(), "in", orderIds),
    orderBy(documentId()),
    where("hasReview", "==", false),
    limit(10)
  );
  return getDocs(ordersQuery);
}

export async function updateReviewState(orderId: string) {
  const userRef = doc(db, "orders", orderId);
  return updateDoc(userRef, { hasReview: true });
}
