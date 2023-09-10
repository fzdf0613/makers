import { DocumentData } from "firebase/firestore";

export function getFomattedProduct(product: DocumentData) {
  return {
    ...product,
    orderStartTime: product.orderStartTime.toDate(),
    orderEndTime: product.orderEndTime.toDate(),
  };
}
