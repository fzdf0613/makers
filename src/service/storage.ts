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
