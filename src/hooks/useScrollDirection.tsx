import { useState, useEffect } from "react";

export default function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("up");
  const [scrollY, setScrollY] = useState(0);
  const threshold = 50; // 滚动阈值，超过这个值才会触发方向变化
  const initialScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  useEffect(() => {
    let lastScrollY = initialScrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, initialScrollY]);

  return { scrollDir, scrollY };
}