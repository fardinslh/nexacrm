"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger progress bar animation whenever pathname or searchParams change
  useEffect(() => {
    setLoading(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(70), 150);
    const timer2 = setTimeout(() => setProgress(100), 300);
    const timer3 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  // Intercept click on <a> tags to show instant progress bar
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        if (url.pathname !== window.location.pathname) {
          setLoading(true);
          setProgress(40);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none bg-slate-100">
      <div
        className="h-full bg-gradient-to-r from-indigo-600 via-violet-500 to-amber-400 transition-all duration-300 ease-out shadow-sm shadow-indigo-500/50"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
