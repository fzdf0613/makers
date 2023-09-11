"use client";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function SWRContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data);
          }
          return data;
        },
        revalidateOnFocus: false,
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
