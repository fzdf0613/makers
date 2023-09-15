import { db } from "@/service/firebase";
import {
  setDoc,
  getDoc,
  doc,
  query,
  collection,
  where,
  limit,
  getDocs,
  documentId,
  updateDoc,
  deleteField,
  orderBy,
  startAfter,
} from "firebase/firestore";

export async function addInquiry(id: string, inquiry: any) {
  return setDoc(doc(db, "inquirys", id), inquiry);
}

export async function getInquirys(userId: string) {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  return getDocs(inquirysQuery);
}

export async function getPostInquirys(postId: string, cursor?: string) {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where("productId", "==", postId),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  if (cursor) {
    const cursorRef = doc(db, "inquirys", cursor);
    const cursorDoc = await getDoc(cursorRef);
    if (!cursorDoc.exists()) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    const queryWithCursor = query(inquirysQuery, startAfter(cursorDoc));
    return getDocs(queryWithCursor);
  }

  return getDocs(inquirysQuery);
}

export async function getWaitingInquirys() {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where("answer", "==", ""),
    limit(30)
  );
  return getDocs(inquirysQuery);
}

export async function getAnsweredInquirys() {
  const inquirysQuery = query(
    collection(db, "inquirys"),
    where("answer", "!=", ""),
    limit(30)
  );
  return getDocs(inquirysQuery);
}

export async function addAnswer(
  inquiryId: string,
  answer: { text: string; createdAt: number }
) {
  const inquiryRef = doc(db, "inquirys", inquiryId);
  return updateDoc(inquiryRef, {
    answer: answer.text,
    answeredAt: answer.createdAt,
  });
}

export async function removeAnswer(inquiryId: string) {
  const inquiryRef = doc(db, "inquirys", inquiryId);
  return updateDoc(inquiryRef, { answer: "", answeredAt: deleteField() });
}
