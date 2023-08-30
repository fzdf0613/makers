import { db } from "@/service/firebase";
import { setDoc, doc } from "firebase/firestore";

export async function addOrder(id: string, order: any) {
  return setDoc(doc(db, "orders", id), order);
}
