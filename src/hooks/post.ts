import { Post } from "@/customType/post";
import useSWR from "swr";

export default function usePost(postId: string) {
  const { data: post, isLoading, error } = useSWR<Post>(`/api/post/${postId}`);

  return { post, error, isLoading };
}
