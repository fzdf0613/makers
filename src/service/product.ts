import { Product } from "@/customType/product";
import { db } from "@/service/firebase";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  doc,
  setDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export async function addProduct(product: Product) {
  try {
    await setDoc(doc(db, "products", product.id), product);
  } catch (e) {
    console.log("Error :", e);
    return null;
  }
}

export async function getProducts() {
  const productQuery = query(
    collection(db, "products"),
    orderBy("id", "desc"),
    limit(10)
  );
  return getDocs(productQuery);
}

export async function getProductsWithCursor(cursor: QueryDocumentSnapshot) {
  const productQuery = query(
    collection(db, "products"),
    orderBy("id", "desc"),
    startAfter(cursor),
    limit(10)
  );
  return getDocs(productQuery);
}
