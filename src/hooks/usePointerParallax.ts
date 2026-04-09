"use client";

import type { PointerEvent } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function usePointerParallax(intensity = 18) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, {
    stiffness: 140,
    damping: 22,
    mass: 0.45,
  });

  const springY = useSpring(pointerY, {
    stiffness: 140,
    damping: 22,
    mass: 0.45,
  });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x * intensity);
    pointerY.set(y * intensity);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return {
    springX,
    springY,
    prefersReducedMotion,
    handlePointerMove,
    handlePointerLeave,
  };
}
