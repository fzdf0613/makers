import { Product } from "@/customType/product";
import { db } from "@/service/firebase";
import { getMonday, getNextMonday } from "@/util/date";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  doc,
  setDoc,
  QueryDocumentSnapshot,
  where,
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

export async function getNewProducts() {
  const monday = getMonday().toISOString().split("T")[0];
  const nextMonday = getNextMonday().toISOString().split("T")[0];

  const productQuery = query(
    collection(db, "products"),
    where("orderStartDate", ">", monday),
    where("orderStartDate", "<=", nextMonday),
    orderBy("orderStartDate", "desc"),
    limit(10)
  );
  return getDocs(productQuery);
}

export async function getProduct(productId: string) {
  const productRef = doc(db, "products", productId);
  return getDoc(productRef);
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
