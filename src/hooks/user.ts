import { UserData } from "@/customType/user";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(productId: string, active: boolean) {
  return fetch("/api/like", {
    method: "PUT",
    body: JSON.stringify({
      productId,
      active,
    }),
  }).then((res) => res.json());
}

async function updateSearch(keyWord: string, isAdd: boolean) {
  return fetch("/api/search", {
    method: "PUT",
    body: JSON.stringify({
      keyWord,
      isAdd,
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

  const updateSearchHistory = (keyWord: string, isAdd: boolean) => {
    if (!user) {
      return;
    }

    let searchList: string[] = [];

    if (isAdd) {
      if (user.search.includes(keyWord)) {
        searchList = [
          keyWord,
          ...user.search.filter((item) => item !== keyWord),
        ];
      } else {
        if (user.search.length === 10) {
          searchList = [keyWord, ...user.search.slice(0, 9)];
        } else {
          searchList = [keyWord, ...user.search];
        }
      }
    } else {
      searchList = [...user.search.filter((item) => item !== keyWord)];
    }

    const updated = {
      ...user,
      search: searchList,
    };

    return mutate(updateSearch(keyWord, isAdd), {
      optimisticData: updated,
      revalidate: false,
      populateCache: false,
    });
  };

  return {
    user,
    error,
    isLoading,
    toggleLike,
    updateSearchHistory,
  };
}
