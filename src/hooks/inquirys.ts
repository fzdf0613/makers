import { Inquiry } from "@/customType/inquiry";
import useSWR from "swr";

export function useUserInquirys() {
  const {
    data: inquirys,
    isLoading,
    error,
  } = useSWR<Inquiry[]>(`/api/inquirys`);

  return { inquirys, error, isLoading };
}

export function usePostInquirys(postId: string) {
  const {
    data: inquirys,
    isLoading,
    error,
  } = useSWR<Inquiry[]>(`/api/inquirys/post/${postId}`);

  return { inquirys, error, isLoading };
}
