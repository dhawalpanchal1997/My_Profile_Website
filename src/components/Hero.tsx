"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { hero, site } from "@/data/resumedata";
import Navbar from "@/components/Navbar";

/* ============================= */
/* LINKEDIN POSTS (OFFICIAL)     */
/* ============================= */

const LINKEDIN_POSTS = [
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7400169977363951616?compact=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7402232855952744448?compact=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7401831654002257920?compact=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7399877980010745856?compact=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7401152306429329408?compact=1",
];

const ROTATION_INTERVAL = 10000;

/* ============================= */
/* HERO                          */
/* ============================= */

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Auto-rotate (paused when engaged) */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LINKEDIN_POSTS.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="home"
      data-rail-theme="dark"
      className="relative min-h-[90vh] flex items-center"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-[#0A1428]"
        animate={{
          backgroundPosition: ["60% 50%", "62% 52%", "60% 50%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/25 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6">
          {/* ===== 2 COL × 2 ROW GRID ===== */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              md:grid-rows-[auto_1fr]
              gap-x-14
              gap-y-3
              items-center
            "
          >
            {/* ───────────── 1C1R — Identity ───────────── */}
            <div className="flex items-center justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/20 shadow-[0_0_18px_rgba(199,162,76,0.35)]">
                  <Image
                    src="/images/logo.png"
                    alt="Dhawal Panchal Logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="leading-tight">
                  <p className="text-white text-xl font-semibold tracking-tight">
                    Dhawal Panchal
                  </p>
                  <p className="text-sm text-white/70">
                    Software Engineer · AI/ML
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ───────────── 2C1R — Navbar ───────────── */}
            <div className="hidden md:flex justify-end items-start">
              <Navbar />
            </div>
            <div className="hidden md:block col-span-1 md:col-start-2">
              <div className="mt-2 h-px w-full bg-white/40" />
            </div>

            {/* ───────────── 1C2R — LinkedIn Slider ───────────── */}
            <div className="flex flex-col items-center md:items-start">
              <div
                className="
                  relative
                  w-full
                  max-w-xl
                  h-[460px]
                  rounded-2xl
                  border border-white/15
                  bg-black/20
                  overflow-hidden
                "
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <LinkedInSlide
                    key={activeIndex}
                    src={LINKEDIN_POSTS[activeIndex]}
                  />
                </AnimatePresence>
              </div>

              {/* ── Pointer Dots ── */}
              <div className="mt-4 flex gap-2">
                {LINKEDIN_POSTS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show LinkedIn post ${i + 1}`}
                    onClick={() => {
                      setIsPaused(true);
                      setActiveIndex(i);
                    }}
                    className={`
                      h-2 w-2 rounded-full transition
                      ${
                        i === activeIndex
                          ? "bg-[color:var(--royal-gold)]"
                          : "bg-white/30 hover:bg-white/50"
                      }
                    `}
                  />
                ))}
              </div>

              {/* ── CTA (C1R2 only) ── */}
              <a
                href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5
                  text-sm
                  font-medium
                  text-white/80
                  hover:text-white
                  transition
                "
              >
                View more on LinkedIn →
              </a>
            </div>

            {/* ───────────── 2C2R — Hero Content ───────────── */}
            <div className="flex items-center justify-start md:justify-start">
              <div className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-sm text-slate-300 tracking-wide"
                >
                  {site.location}
                </motion.p>

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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  className="mt-7 flex flex-wrap gap-2"
                >
                  {hero.tags.map((tag) => (
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
        </div>
      </div>
    </section>
  );
}

/* ============================= */
/* SINGLE LINKEDIN SLIDE         */
/* ============================= */

function LinkedInSlide({ src }: { src: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <iframe
        src={src}
        title="LinkedIn post"
        loading="lazy"
        className="w-full h-full"
        frameBorder={0}
        allowFullScreen
      />
    </motion.div>
  );
}
