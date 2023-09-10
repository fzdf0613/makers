import { Timestamp } from "firebase/firestore";

export function getDateByTimestamp(fieldVal: Timestamp): Date {
  const timeStamp = new Timestamp(fieldVal.seconds, fieldVal.nanoseconds);
  const date = timeStamp.toDate();
  return date;
}
