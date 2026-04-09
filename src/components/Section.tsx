"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden scroll-mt-32 px-6 py-24 sm:scroll-mt-36 sm:px-8 lg:px-10 ${className ?? ""}`}
    >
      <div className="section-fade" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="pill-label inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-200">
                {eyebrow}
              </p>
            )}

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl [font-family:var(--font-display)]">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div>{children}</div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full px-6 sm:px-8 lg:px-10">
        <div className="section-divider mx-auto max-w-6xl" />
      </div>
    </section>
  );
}
