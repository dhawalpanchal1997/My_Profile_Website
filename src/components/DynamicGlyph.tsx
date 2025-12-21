"use client";

import { motion } from "framer-motion";

export default function DynamicGlyph() {
  return (
    <motion.div
      className="
        mt-4
        h-10 w-10
        rounded-full
        border border-[var(--royal-gold)]
        flex items-center justify-center
        text-[var(--royal-gold)]
        text-xs font-semibold
        tracking-widest
      "
      animate={{
        rotate: [0, 180, 360],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      AI
    </motion.div>
  );
}
