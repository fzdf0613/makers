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
  runTransaction,
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
      search: [],
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

export async function addSearchKeyWord(userId: string, keyWord: string) {
  const userRef = doc(db, "users", userId);
  return runTransaction(db, async (transaction) => {
    const doc = await transaction.get(userRef);
    if (!doc.exists()) {
      throw new Error("유저 데이터가 존재하지 않습니다.");
    }
    const searchList = doc.data().search;
    let updatedList;
    if (searchList.length === 10) {
      if (searchList.includes(keyWord)) {
        updatedList = [
          ...searchList.filter((item: string) => item !== keyWord),
          keyWord,
        ];
      } else {
        updatedList = [...searchList.slice(0, 9), keyWord];
      }
    } else {
      if (searchList.includes(keyWord)) {
        updatedList = [
          ...searchList.filter((item: string) => item !== keyWord),
          keyWord,
        ];
      } else {
        updatedList = [...searchList, keyWord];
      }
    }
    transaction.update(userRef, { search: updatedList });
  });
}

export async function removeSearchKeyWord(userId: string, keyWord: string) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, { search: arrayRemove(keyWord) });
}
