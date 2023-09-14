"use client";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  onIntersect: (...args: any[]) => any;
};

export default function InfiniteScrollSentinel({
  className,
  onIntersect,
}: Props) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            onIntersect();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [onIntersect]);

  return <div ref={sentinelRef} aria-hidden="true" className={className}></div>;
}
