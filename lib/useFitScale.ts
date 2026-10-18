"use client";

import { useEffect, useState } from "react";

/** Scale factor (≤1) that fits a fixed-width artboard into the element's width. */
export function useFitScale(ref: React.RefObject<HTMLElement | null>, designWidth: number) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(Math.min(1, e.contentRect.width / designWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, designWidth]);
  return s;
}
