import { Product } from "@/customType/product";
import { db } from "@/service/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function addProduct(product: Product) {
  try {
    await setDoc(doc(db, "products", product.id), product);
  } catch (e) {
    console.log("Error :", e);
    return null;
  }
}
