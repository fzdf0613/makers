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
  where,
  updateDoc,
  increment,
  documentId,
  Query,
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
    where("orderEndTime", ">", new Date()),
    orderBy("orderEndTime", "asc"),
    orderBy("orderStartTime", "desc"),
    limit(10)
  );
  return getDocs(productQuery);
}

export async function getNewProducts(cursor?: string) {
  const monday = getMonday();
  const nextMonday = getNextMonday();

  const productQuery = query(
    collection(db, "products"),
    where("orderStartTime", ">", monday),
    where("orderStartTime", "<=", nextMonday),
    orderBy("orderStartTime", "desc"),
    limit(10)
  );

  if (cursor) {
    const cursorRef = doc(db, "products", cursor);
    const cursorDoc = await getDoc(cursorRef);
    if (!cursorDoc.exists()) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    const queryWithCursor = query(productQuery, startAfter(cursorDoc));
    return getDocs(queryWithCursor);
  }

  return getDocs(productQuery);
}

export async function searchProducts(keyWord: string) {
  const productQuery = query(
    collection(db, "products"),
    orderBy("orderStartTime", "desc"),
    limit(20)
  );
  return getDocs(productQuery);
}

export async function getPreorderProducts(cursor?: string) {
  const productQuery = query(
    collection(db, "products"),
    where("orderStartTime", ">", new Date()),
    orderBy("orderStartTime", "desc"),
    limit(10)
  );

  if (cursor) {
    const cursorRef = doc(db, "products", cursor);
    const cursorDoc = await getDoc(cursorRef);
    if (!cursorDoc.exists()) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    const queryWithCursor = query(productQuery, startAfter(cursorDoc));
    return getDocs(queryWithCursor);
  }

  return getDocs(productQuery);
}

export async function getLikeProducts(productIds: string[]) {
  const productQuery = query(
    collection(db, "products"),
    where(documentId(), "in", productIds)
  );
  return getDocs(productQuery);
}

export async function getSeenProducts(productIds: string[]) {
  const productQuery = query(
    collection(db, "products"),
    where(documentId(), "in", productIds)
  );
  return getDocs(productQuery);
}

export async function getProductsByFilter(
  filter: {
    category: string;
    subcategory: string;
    sort: string;
  },
  cursor?: string
) {
  let productQuery: Query;
  const sortFilter = getFieldBySort(filter.sort);

  if (filter.category === "all") {
    productQuery = query(
      collection(db, "products"),
      orderBy(sortFilter.name, sortFilter.order),
      limit(10)
    );
  } else {
    if (filter.subcategory === "전체") {
      productQuery = query(
        collection(db, "products"),
        where("category", "==", filter.category),
        orderBy(sortFilter.name, sortFilter.order),
        limit(10)
      );
    } else {
      productQuery = query(
        collection(db, "products"),
        where("category", "==", filter.category),
        where("subcategory", "==", filter.subcategory),
        orderBy("id", "desc"),
        limit(10)
      );
    }
  }

  if (cursor) {
    const cursorRef = doc(db, "products", cursor);
    const cursorDoc = await getDoc(cursorRef);
    if (!cursorDoc.exists()) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    const queryWithCursor = query(productQuery, startAfter(cursorDoc));
    return getDocs(queryWithCursor);
  }

  return getDocs(productQuery);
}

export async function getCategoryProducts(category: string) {
  let productQuery;
  productQuery = query(
    collection(db, "products"),
    where("category", "==", category),
    limit(20)
  );
  return getDocs(productQuery);
}

export async function getProduct(productId: string) {
  const productRef = doc(db, "products", productId);
  return getDoc(productRef);
}

export async function updateItemCount(productId: string, count: number) {
  const productRef = doc(db, "products", productId);
  return updateDoc(productRef, {
    itemCount: increment(-count),
    currentOrderCount: increment(count),
    orderUserCount: increment(1),
  });
}

function getFieldBySort(sort: string): { name: string; order: "desc" | "asc" } {
  switch (sort) {
    case "LATEST":
      return { name: "id", order: "desc" };
    case "CLOSING":
      return { name: "orderEndTime", order: "asc" };
    case "ORDER":
      return { name: "currentOrderCount", order: "desc" };
    default:
      return { name: "id", order: "desc" };
  }
}
