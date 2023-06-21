import { useRef, useEffect } from "react";

export default function useThrottle(callback: () => void, delay: number = 200) {
  const throttledCallbackRef = useRef<() => void>();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    throttledCallbackRef.current = () => {
      if (timerRef.current) {
        return;
      }
      timerRef.current = setTimeout(() => {
        callback();
        timerRef.current = null;
      }, delay);
    };
  }, [callback, delay]);

  return throttledCallbackRef.current;
}
