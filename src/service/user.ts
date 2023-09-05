import { db } from "@/service/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { hashPassword } from "@/util/bcrypt";

export async function createUserByCredential(
  userid: string,
  password: string,
  username: string,
  profileImageUrl: string
) {
  const isExistingUser = await isExistingId(userid);
  if (!isExistingUser) {
    const hash = await hashPassword(password);
    const newUser = {
      isAdmin: false,
      like: [],
      ordered: [],
      password: hash,
      inquiry: [],
      review: [],
      seen: [],
      userid,
      username,
      profileImageUrl,
    };
    try {
      const docRef = await addDoc(collection(db, "users"), newUser);
      const doc = await getDoc(docRef);
      return doc.data();
    } catch (e) {
      console.log("Error :", e);
      return null;
    }
  } else {
    return null;
  }
}

export async function isExistingId(id: string) {
  const user = await getUserById(id);
  if (user === null) {
    return false;
  }
  return true;
}

export async function getUserById(id: string) {
  const userRef = doc(db, "users", id);
  try {
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
      return null;
    }
    const userData = snapshot.data();
    return {
      ...userData,
      id: snapshot.id,
      like: userData.like ?? [],
      ordered: userData.ordered ?? [],
      qna: userData.qna ?? [],
      review: userData.review ?? [],
      seen: userData.seen ?? [],
    };
  } catch (error) {
    return error;
  }
}

export async function getUserByUserId(userId: string) {
  const userQuery = query(
    collection(db, "users"),
    where("userid", "==", userId)
  );
  try {
    const snapshot = await getDocs(userQuery);
    if (!snapshot.docs) {
      return null;
    }
    const userData = {
      ...snapshot.docs[0].data(),
      id: snapshot.docs[0].id,
    };
    return userData;
  } catch (error) {
    return error;
  }
}

export async function addLike(userId: string, productId: string) {
  const batch = writeBatch(db);
  const productRef = doc(db, "products", productId);
  const userRef = doc(db, "users", userId);
  batch.update(productRef, { likeCount: increment(1) });
  batch.update(userRef, { like: arrayUnion(productId) });
  return batch.commit();
}

export async function removeLike(userId: string, productId: string) {
  const batch = writeBatch(db);
  const productRef = doc(db, "products", productId);
  const userRef = doc(db, "users", userId);
  batch.update(productRef, { likeCount: increment(-1) });
  batch.update(userRef, { like: arrayRemove(productId) });
  return batch.commit();
}

export async function addOrdered(userId: string, orderId: string) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, { ordered: arrayUnion(orderId) });
}

export async function addReviewToUser(userId: string, reviewId: string) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, { review: arrayUnion(reviewId) });
}

export async function addInquiryToUser(userId: string, inquiryId: string) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, { inquiry: arrayUnion(inquiryId) });
}
