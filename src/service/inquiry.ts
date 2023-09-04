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

export async function addInquiry(id: string, inquiry: any) {
  return setDoc(doc(db, "inquirys", id), inquiry);
}

export async function getInquirys(inquiryIds: string[]) {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where(documentId(), "in", inquiryIds),
    limit(20)
  );
  return getDocs(inquirysQuery);
}

export async function getPostInquirys(postId: string) {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where("productId", "==", postId),
    limit(10)
  );
  return getDocs(inquirysQuery);
}
