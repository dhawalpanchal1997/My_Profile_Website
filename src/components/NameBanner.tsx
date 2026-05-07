"use client";

import { motion, useTransform } from "framer-motion";
import { site } from "@/data/resumedata";
import { usePointerParallax } from "@/hooks/usePointerParallax";

export default function NameBanner() {
  const { springX, springY, handlePointerMove, handlePointerLeave } =
    usePointerParallax(18);
  const panelX = useTransform(springX, (value) => value * 0.22);
  const panelY = useTransform(springY, (value) => value * 0.18);
  const glowX = useTransform(springX, (value) => value * 0.65);
  const glowY = useTransform(springY, (value) => value * 0.5);
  const lettersX = useTransform(springX, (value) => value * 0.1);
  const lettersY = useTransform(springY, (value) => value * 0.08);

  return (
    <section className="px-6 pt-8 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        className="mx-auto max-w-6xl"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          style={{ x: panelX, y: panelY }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] px-4 py-8 shadow-[0_24px_70px_rgba(2,6,23,0.32)] backdrop-blur sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute inset-x-[18%] top-1/2 h-24 -translate-y-1/2 rounded-full bg-sky-300/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-[12%] top-[24%] h-3 w-3 rounded-full bg-sky-300/40 blur-[1px]"
          />
          <motion.div
            animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute right-[14%] top-[30%] h-2.5 w-2.5 rounded-full bg-amber-300/35 blur-[1px]"
          />

          <p className="text-center text-[11px] uppercase tracking-[0.42em] text-sky-200/75">
            Portfolio
          </p>

          <motion.div
            aria-label={site.name}
            role="img"
            style={{ x: lettersX, y: lettersY }}
            className="signature-name mx-auto mt-2 w-full max-w-5xl"
          >
            <svg
              className="signature-name__svg"
              viewBox="0 0 980 190"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="signatureNameGradient"
                  x1="12%"
                  x2="88%"
                  y1="8%"
                  y2="88%"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="36%" stopColor="#7dd3fc" />
                  <stop offset="68%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <clipPath id="signatureNameClip" clipPathUnits="userSpaceOnUse">
                  <rect
                    className="signature-name__clip"
                    x="88"
                    y="0"
                    width="824"
                    height="162"
                  />
                </clipPath>
              </defs>

              <text
                className="signature-name__shadow"
                x="50%"
                y="116"
                textAnchor="middle"
                textLength="800"
                lengthAdjust="spacingAndGlyphs"
              >
                {site.name}
              </text>
              <text
                className="signature-name__stroke"
                x="50%"
                y="116"
                textAnchor="middle"
                textLength="800"
                lengthAdjust="spacingAndGlyphs"
              >
                {site.name}
              </text>
              <text
                className="signature-name__fill"
                clipPath="url(#signatureNameClip)"
                x="50%"
                y="116"
                textAnchor="middle"
                textLength="800"
                lengthAdjust="spacingAndGlyphs"
              >
                {site.name}
              </text>
              <path
                className="signature-name__flourish"
                d="M165 143 C260 170 440 170 520 147 C592 126 704 127 815 151"
                pathLength="1"
              />
            </svg>
          </motion.div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-sky-300/70" />
            <p className="text-center text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              AI Engineer
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
