"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Section from "@/components/Section";
import { experience } from "@/data/resumedata";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Recent roles where I built systems teams could actually ship and operate."
      subtitle="A progression from enterprise delivery to full-stack execution to production AI engineering, with a strong through-line in architecture, ownership, and measurable outcomes."
    >
      <div className="relative grid gap-5">
        {experience.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
              className="surface-card relative overflow-hidden rounded-[2rem] p-6 sm:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_24%)]" />

              <div className="relative">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">
                        {item.duration}
                      </p>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-base text-[var(--text-secondary)]">
                      {item.company}
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                      {item.focus}
                    </p>
                  </div>

                  <div className="flex w-full max-w-xl flex-col items-start gap-3 lg:w-auto lg:items-end">
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1.5 text-xs font-medium text-sky-100"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:bg-white/[0.08]"
                    >
                      {isOpen ? "Hide Details" : "View Details"}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-3 lg:grid-cols-2">
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            Role Snapshot
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white">
                            {item.points[0]}
                          </p>
                        </div>
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                            Strength
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white">
                            End-to-end ownership from design through delivery and operations.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {item.points.map((point, pointIndex) => (
                          <div
                            key={point}
                            className="rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] px-4 py-4"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-xs font-semibold text-sky-100">
                                {pointIndex + 1}
                              </span>
                              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                                {point}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-sm text-sky-200">
                        <ArrowUpRight size={15} />
                        Built for product impact, scale, and maintainability.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
