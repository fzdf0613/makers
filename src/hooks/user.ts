import { UserData } from "@/customType/user";
import useSWR from "swr";

async function updateLike(productId: string, active: boolean) {
  return fetch("/api/like", {
    method: "PUT",
    body: JSON.stringify({
      productId,
      active,
    }),
  }).then((res) => res.json());
}

export default function useCurrentUser() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<UserData>(`/api/currentUser`);

  const toggleLike = (productId: string, active: boolean) => {
    if (!user) {
      return;
    }
    const updated = {
      ...user,
      like: active
        ? [...user.like, productId]
        : user.like.filter((item) => item !== productId),
    };

    return mutate(updateLike(productId, active), {
      optimisticData: updated,
      revalidate: false,
      populateCache: false,
    });
  };

  return { user, error, isLoading, toggleLike };
}
