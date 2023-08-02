import { Post } from "@/customType/post";
import { db } from "@/service/firebase";
import { doc, setDoc, runTransaction, writeBatch } from "firebase/firestore";

export async function addPost(post: Post) {
  try {
    await setDoc(doc(db, "posts", post.id), post);
  } catch (e) {
    console.log("Error :", e);
    return null;
  }
}
