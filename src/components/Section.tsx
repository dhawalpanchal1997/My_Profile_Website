"use client"

import { motion } from "framer-motion"
import { useReveal } from "@/hooks/useReveal"

interface SectionProps {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  const { ref, isVisible } = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden py-28 ${className ?? ""}`}
    >
      {/* Ambient AI motion (very subtle) */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: [0.96, 1, 0.96] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-6"
      >
        {/* Eyebrow (Royal Gold) */}
        {eyebrow && (
          <p
            className="
              mb-4
              text-xs
              uppercase
              tracking-[0.28em]
              text-[color:var(--royal-gold)]
            "
          >
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-950">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 max-w-xl text-neutral-600">
            {subtitle}
          </p>
        )}

        {/* Section content */}
        <div className="mt-14">
          {children}
        </div>
      </motion.div>

      {/* Royal separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="section-separator mx-auto max-w-5xl" />
      </div>
    </section>
  )
}
