"use client";
import { createContext, useContext, useMemo } from "react";
import useScrollYHandler from "@/hooks/scrollYHandler";

type Props = {
  children: React.ReactNode;
};

type ScrollYValue = {
  isScrollDown: boolean;
  Y: number;
};

const ScrollYContext = createContext<ScrollYValue>({
  isScrollDown: false,
  Y: 0,
});

export default function ScrollYContextProvider({ children }: Props) {
  const { isScrolled: isScrollDown, Y } = useScrollYHandler();
  // const values = useMemo(() => ({ isScrollDown, Y }), [isScrollDown, Y]);
  return (
    // <ScrollYContext.Provider value={values}>{children}</ScrollYContext.Provider>
    <ScrollYContext.Provider value={{ isScrollDown, Y }}>
      {children}
    </ScrollYContext.Provider>
  );
}

export const useScrollYContext = () => useContext(ScrollYContext);
