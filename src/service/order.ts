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
} from "firebase/firestore";

export async function addOrder(id: string, order: any) {
  return setDoc(doc(db, "orders", id), order);
}

export async function getOrders(orderIds: string[]) {
  const ordersQuery = query(
    collection(db, "orders"),
    where(documentId(), "in", orderIds),
    limit(10)
  );
  return getDocs(ordersQuery);
}
