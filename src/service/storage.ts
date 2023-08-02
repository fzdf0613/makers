import { storage } from "@/service/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadProfileImageWithUserid(
  userid: string,
  file: File
): Promise<string> {
  const fileName = `${userid}.${file.type.split("/")[1]}`;

  const userProfileImagesRef = ref(
    storage,
    `images/profile/${Date.now()}${fileName}`
  );

  const buffer = await file.arrayBuffer();

  await uploadBytes(userProfileImagesRef, buffer);
  const url = await getDownloadURL(userProfileImagesRef);
  return url;
}

export async function uploadPostImage(file: File): Promise<string> {
  const userPostImagesRef = ref(
    storage,
    `images/post/${Date.now()}.${file.type.split("/")[1]}`
  );

  const buffer = await file.arrayBuffer();

  await uploadBytes(userPostImagesRef, buffer);
  const urlResult = await getDownloadURL(userPostImagesRef);
  return urlResult;
}
