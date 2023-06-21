"use client";
import { createContext, useContext } from "react";
import useScrollYHandler from "@/hooks/scrollYHandler";

type Props = {
  children: React.ReactNode;
};

type ScrollYValue = {
  isScrollDown: boolean;
};

export const ScrollYContext = createContext<ScrollYValue>({
  isScrollDown: false,
});

export default function ScrollYContextProvider({ children }: Props) {
  const { isScrolled: isScrollDown } = useScrollYHandler();
  return (
    <ScrollYContext.Provider value={{ isScrollDown }}>
      {children}
    </ScrollYContext.Provider>
  );
}

export const useScrollYContext = () => useContext(ScrollYContext);
