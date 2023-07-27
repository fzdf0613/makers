import { db } from "@/service/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
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
      ordred: [],
      password: hash,
      qna: [],
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
  const q = query(collection(db, "users"), where("userid", "==", id));
  const querySnapshot = await getDocs(q);
  // 찾는 유저가 없는 경우, querySnapshot.docs는 빈 배열([])임.
  if (querySnapshot.docs.length === 0) {
    return null;
  }
  return querySnapshot.docs[0].data();
}
