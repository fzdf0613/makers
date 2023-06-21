import { useState, useEffect } from "react";
import useThrottle from "./throttle";

export default function useScrollYHandler(threshhold: number = 40) {
  const [Y, setY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentY = window.scrollY;
    if (currentY - Y < 0) {
      // 스크롤 올렸을 때
      setIsScrolled(false);
    } else {
      // 스크롤 내렸을 때
      if (currentY >= 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    setY(currentY);
  };

  const throttledCallback = useThrottle(handleScroll, 100);

  useEffect(() => {
    if (!throttledCallback) {
      return;
    }
    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
    };
  }, [Y, throttledCallback]);

  return { Y, isScrolled };
}
