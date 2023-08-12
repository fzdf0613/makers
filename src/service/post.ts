import { Post } from "@/customType/post";
import { db } from "@/service/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function addPost(post: Post) {
  try {
    await setDoc(doc(db, "posts", post.id), post);
  } catch (e) {
    console.log("Error :", e);
    return null;
  }
}

export async function getPost(postId: string) {
  const postRef = doc(db, "posts", postId);
  return getDoc(postRef);
}
