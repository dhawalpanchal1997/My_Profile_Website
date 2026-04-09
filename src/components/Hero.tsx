"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { experience, hero, site, starScenarios } from "@/data/resumedata";
import { usePointerParallax } from "@/hooks/usePointerParallax";

const proofPoints = [
  { label: "Roles shipped", value: `${experience.length}+` },
  { label: "STAR stories", value: `${starScenarios.length}` },
  { label: "Focus areas", value: `${hero.tags.length}` },
];

export default function Hero() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = starScenarios[activeScenarioIndex];
  const { springX, springY, handlePointerMove, handlePointerLeave } =
    usePointerParallax(20);
  const leftX = useTransform(springX, (value) => value * 0.22);
  const leftY = useTransform(springY, (value) => value * 0.18);
  const rightX = useTransform(springX, (value) => value * -0.18);
  const rightY = useTransform(springY, (value) => value * -0.12);
  const auraX = useTransform(springX, (value) => value * 0.6);
  const auraY = useTransform(springY, (value) => value * 0.45);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveScenarioIndex((current) => (current + 1) % starScenarios.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const goToPreviousScenario = () => {
    setActiveScenarioIndex((current) =>
      current === 0 ? starScenarios.length - 1 : current - 1,
    );
  };

  const goToNextScenario = () => {
    setActiveScenarioIndex((current) => (current + 1) % starScenarios.length);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-32 px-6 pb-20 pt-14 sm:scroll-mt-36 sm:px-8 lg:px-10 lg:pb-28"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={{ x: auraX, y: auraY }}
        className="pointer-events-none absolute left-[8%] top-[12%] h-44 w-44 rounded-full bg-sky-300/10 blur-3xl"
      />
      <motion.div
        style={{ x: rightX }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[10%] top-[18%] h-36 w-36 rounded-full bg-cyan-300/8 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.98fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ x: leftX, y: leftY }}
          className="relative"
        >
          <div className="pill-label inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-sky-100">
            <Sparkles size={16} className="text-sky-300" />
            Production-grade AI engineer with full-stack depth
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.26em] text-[var(--text-secondary)]">
            {site.location}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl [font-family:var(--font-display)]">
            Building modern AI products that feel fast, useful, and ready for
            production.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            {hero.subheadline}
          </p>

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-sky-200/80">
              What I Optimize For
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  Faster delivery
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Turning multi-step workflows into reliable systems with lower
                  latency and clearer orchestration.
                </p>
              </motion.div>
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 7.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  Grounded outputs
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Improving quality with stronger context handling, structured
                  generation, and enterprise traceability.
                </p>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  Adoption at scale
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Designing around real team workflows so new AI systems fit
                  delivery instead of disrupting it.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          style={{ x: rightX, y: rightY }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, -0.4, 0.2, 0] }}
            transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
            className="surface-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_24%)]" />
            <motion.div
              animate={{ x: [0, 16, 0], y: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute right-6 top-6 h-12 w-12 rounded-full border border-sky-300/15 bg-sky-300/10 blur-md"
            />

            <div className="relative mt-5 grid gap-4">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200/80">
                Glimps of Problems Solved
              </p>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Scenario {activeScenario.id}
                    </p>
                    <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-medium text-sky-100">
                      {activeScenario.impact}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous STAR scenario"
                      onClick={goToPreviousScenario}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/[0.08]"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next STAR scenario"
                      onClick={goToNextScenario}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/[0.08]"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-3"
                >
                  <p className="mt-3 text-lg font-semibold text-white">
                    {activeScenario.title}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">
                        Situation
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {activeScenario.situation}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">
                        Task
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {activeScenario.task}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">
                        Action
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {activeScenario.action}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">
                        Result
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {activeScenario.result}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {starScenarios.map((scenario, index) => (
                    <button
                      key={scenario.id}
                      type="button"
                      aria-label={`Show scenario ${scenario.id}`}
                      onClick={() => setActiveScenarioIndex(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === activeScenarioIndex
                          ? "w-8 bg-sky-300"
                          : "w-2.5 bg-white/20 hover:bg-white/35"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2 lg:flex-nowrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-sky-300 to-cyan-200 px-3.5 py-2 text-sm font-semibold !text-slate-950 shadow-[0_14px_30px_rgba(56,189,248,0.24)] transition hover:from-sky-200 hover:to-cyan-100 hover:!text-slate-950 focus-visible:!text-slate-950"
              >
                Explore Projects
                <ArrowUpRight size={16} />
              </a>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.10]"
              >
                Open Resume
                <ArrowUpRight size={16} />
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 px-3.5 py-2 text-sm text-white transition hover:bg-white/[0.08]"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 px-3.5 py-2 text-sm text-white transition hover:bg-white/[0.08]"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
