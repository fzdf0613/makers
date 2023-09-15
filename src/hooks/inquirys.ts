import { Inquiry } from "@/customType/inquiry";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";

async function updateInquiry(
  inquiryId: string,
  answer: { text: string; createdAt: number | undefined },
  isAdd: boolean
) {
  return fetch("/api/inquiry/update", {
    method: "PUT",
    body: JSON.stringify({
      inquiryId,
      answer,
      isAdd,
    }),
  }).then((res) => res.json());
}

export function useUserInquirys() {
  const {
    data: inquirys,
    isLoading,
    error,
  } = useSWR<Inquiry[]>(`/api/inquirys`);

  return { inquirys, error, isLoading };
}

export function usePostInquirys(postId: string) {
  const { data, isLoading, isValidating, error, size, setSize } =
    useSWRInfinite<Inquiry[]>((pageIndex, previousPageData) => {
      // 첫 페이지
      if (pageIndex === 0 && !previousPageData) {
        return `/api/inquirys/post/${postId}`;
      }
      if (previousPageData) {
        if (!previousPageData.length) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `/api/inquirys/post/${postId}?cursor=${cursor}`;
      }
    });

  return { data, error, isLoading, size, setSize, isValidating };
}

export function useInquirys(state: "waiting" | "answered" = "waiting") {
  const {
    data: inquirys,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<Inquiry[]>(
    state === "waiting" ? "/api/inquirys/waiting" : "/api/inquirys/answered"
  );

  const { mutate: globalMutate } = useSWRConfig();

  const addAnswer = (
    targetInquiryId: string,
    answer: { text: string; createdAt: number }
  ) => {
    if (!inquirys) {
      return;
    }
    const targetInquiry = inquirys.find(
      (inquiry) => inquiry.id === targetInquiryId
    );

    if (!targetInquiry) {
      return;
    }

    const newInquiry = {
      ...targetInquiry,
      answer: answer.text,
      answeredAt: answer.createdAt,
    };
    let updated;
    if (state === "waiting") {
      console.log("waiting");
    }
    if (state === "answered") {
      updated = inquirys.map((inquiry) => {
        if (inquiry.id === targetInquiryId) {
          return newInquiry;
        } else {
          return inquiry;
        }
      });
    } else {
      updated = inquirys.filter((inquiry) => inquiry.id !== targetInquiryId);
    }

    return globalMutate(
      state === "waiting" ? "/api/inquirys/waiting" : "/api/inquirys/answered",
      updateInquiry(targetInquiryId, answer, true),
      {
        optimisticData: updated,
        revalidate: false,
        populateCache: false,
      }
    );
  };

  const removeAnswer = (targetInquiryId: string) => {
    if (!inquirys) {
      return;
    }
    const updated = inquirys.filter((inquiry) => {
      inquiry.id !== targetInquiryId;
    });

    return mutate(
      updateInquiry(targetInquiryId, { text: "", createdAt: undefined }, false),
      {
        optimisticData: updated,
        revalidate: false,
        populateCache: false,
      }
    );
  };

  return { inquirys, isValidating, error, isLoading, addAnswer, removeAnswer };
}
