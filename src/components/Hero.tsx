"use client"

import { motion } from "framer-motion"
import { hero, site } from "@/data/resumedata"

export default function Hero() {
  return (
    <section
      id="home"
      data-rail-theme="dark"
      className="relative min-h-[90vh] flex items-center"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 gradiant bg-[#0A1428] bg-[center_right]"
        style={{ backgroundImage: "" }}
        animate={{
          backgroundPosition: [
            "60% 50%",
            "62% 52%",
            "60% 50%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft overlay (NOT too dark) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl">
            
            {/* Location / meta */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm text-slate-300 tracking-wide"
            >
              {site.location}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                mt-4
                text-4xl md:text-5xl
                font-semibold
                tracking-[-0.02em]
                text-white
                leading-tight

              "
            >
              {hero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="
                mt-6
                text-base md:text-lg
                text-slate-200
                leading-relaxed
              "
            >
              {hero.subheadline}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {hero.tags.map(tag => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border border-white/25
                    px-3 py-1
                    text-xs
                    text-white/90
                    backdrop-blur
                  "
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-9 flex items-center gap-4"
            >
              <a
                href="#projects"
                className="
                  rounded-xl
                  bg-[color:var(--bg-surface)]
                  text-neutral-900
                  px-5 py-2.5
                  text-sm font-medium
                  hover:bg-neutral-100
                  transition
                "
              >
                View Work
              </a>

              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-sm font-medium
                  text-white/90
                  hover:text-white
                  transition
                "
              >
                Resume →
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
