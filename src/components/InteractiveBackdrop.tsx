"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = {
  id: number;
  x: string;
  y: string;
};

export default function InteractiveBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 50, y: 18 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const flushFrame = () => {
      rafRef.current = null;
      backdrop.style.setProperty("--pointer-x", `${pointerTargetRef.current.x}%`);
      backdrop.style.setProperty("--pointer-y", `${pointerTargetRef.current.y}%`);
    };

    const scheduleFrame = () => {
      if (prefersReducedMotion || rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(flushFrame);
    };

    const updateScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      backdrop.style.setProperty("--scroll-progress", progress.toFixed(3));
      backdrop.style.setProperty(
        "--scroll-shift",
        `${Math.min(progress * 140, 140)}px`
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerTargetRef.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      };

      if (!prefersReducedMotion) {
        scheduleFrame();
      }
    };

    const handleClick = (event: MouseEvent) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const ripple = {
        id,
        x: `${(event.clientX / window.innerWidth) * 100}%`,
        y: `${(event.clientY / window.innerHeight) * 100}%`,
      };

      setRipples((current) => [...current, ripple]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== id));
      }, 900);
    };

    backdrop.style.setProperty("--pointer-x", "50%");
    backdrop.style.setProperty("--pointer-y", "18%");
    updateScroll();

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("click", handleClick);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={backdropRef} className="interactive-backdrop" aria-hidden="true">
      <div className="interactive-backdrop__gradient" />
      <div className="interactive-backdrop__beam" />
      <div className="interactive-backdrop__drift" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="interactive-backdrop__ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </div>
  );
}
