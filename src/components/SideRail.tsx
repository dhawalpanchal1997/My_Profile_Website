"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/resumedata";

export default function SideRail() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const hero = document.querySelector('[data-rail-theme="dark"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const colorClass = isDark
    ? "text-[color:var(--royal-gold)]"
    : "text-neutral-900";

  const lineClass = isDark ? "bg-[color:var(--royal-gold)]/40" : "bg-black/40";

  return (
    <>
      {/* LEFT RAIL — Social Icons (BOTTOM) */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="hidden lg:flex fixed left-6 bottom-10 z-40"
      >
        <div className="flex flex-col items-center gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${colorClass} hover:opacity-70 transition-colors`}
          >
            <Github size={20} />
          </a>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${colorClass} hover:opacity-70 transition-colors`}
          >
            <Linkedin size={20} />
          </a>

          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className={`${colorClass} hover:opacity-70 transition-colors`}
          >
            <Mail size={20} />
          </a>

          <div className={`h-16 w-px ${lineClass}`} />
        </div>
      </motion.aside>

      {/* RIGHT RAIL — Email (BOTTOM) */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="hidden lg:flex fixed right-6 bottom-10 z-40"
      >
        <div className="flex flex-col items-center gap-6">
          <div className={`h-16 w-px ${lineClass}`} />

          <a
            href={`mailto:${site.email}`}
            aria-label="Email address"
            className={`
              text-sm font-medium tracking-wide
              ${colorClass}
              hover:opacity-70 transition-colors
              [writing-mode:vertical-rl]
            `}
          >
            {site.email}
          </a>
        </div>
      </motion.aside>
    </>
  );
}
