import { Product } from "@/customType/product";
import { DocumentData } from "firebase/firestore";

export function getFomattedProduct(product: DocumentData) {
  return {
    ...(product as Product),
    orderStartTime: product.orderStartTime.toDate(),
    orderEndTime: product.orderEndTime.toDate(),
  };
}
