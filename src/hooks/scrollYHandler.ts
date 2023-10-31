import { useState, useEffect, useCallback } from "react";

export default function useScrollYHandler(threshhold: number = 40) {
  const [Y, setY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [throttle, setThrottle] = useState(false);

  const handleScroll = useCallback(() => {
    if (throttle) {
      return;
    }
    setThrottle(true);
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
    setTimeout(() => {
      setThrottle(false);
    }, 10);
  }, [Y, throttle]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { Y, isScrolled };
}
