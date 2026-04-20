"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// We store the lenis instance globally so page.tsx can stop it before
// forcibly resetting scroll position (bypassing Lenis's smooth intercept).
let lenisInstance: Lenis | null = null;

export function stopLenis() {
  lenisInstance?.stop();
}

export function startLenis() {
  lenisInstance?.start();
}

export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
};
