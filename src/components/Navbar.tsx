"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/resumedata";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const shellBaseClassName =
  "relative overflow-hidden border border-white/12 bg-[linear-gradient(180deg,rgba(8,15,28,0.82),rgba(8,15,28,0.7))] shadow-[0_20px_60px_rgba(2,6,23,0.34),0_10px_30px_rgba(56,189,248,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl";

const linkTransition = {
  type: "spring" as const,
  stiffness: 360,
  damping: 30,
  mass: 0.7,
};

export default function Navbar() {
  const activeId = useScrollSpy(
    sections.map((section) => section.id),
    148,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const mobileMenuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);

    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const sharedPillTransition = shouldReduceMotion
    ? { duration: 0 }
    : linkTransition;

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
      }
      className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: isScrolled ? 0.988 : 1, y: isScrolled ? -1 : 0 }
          }
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={`${shellBaseClassName} ${
            isScrolled
              ? "rounded-[1.6rem] px-3.5 py-2.5 sm:px-4"
              : "rounded-[1.9rem] px-4 py-3.5 sm:px-5 xl:px-6"
          } transition-[padding,border-radius,box-shadow,background-color] duration-300`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-200/55 to-transparent"
          />

          <div className="relative flex items-center justify-between gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
            <a
              href="#home"
              aria-label="Go to home"
              className="group inline-flex min-w-0 items-center rounded-[1.25rem] px-1 py-1 outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <motion.span
                aria-hidden
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1],
                        rotate: [0, -4, 4, 0],
                        boxShadow: [
                          "0 0 0 rgba(56,189,248,0)",
                          "0 0 28px rgba(56,189,248,0.36)",
                          "0 0 0 rgba(56,189,248,0)",
                        ],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 8.8,
                      }
                }
                className={`inline-flex aspect-square items-center justify-center rounded-full border border-sky-200/30 bg-[linear-gradient(135deg,rgba(186,230,253,0.96),rgba(56,189,248,0.88))] font-bold text-black shadow-[0_14px_32px_rgba(56,189,248,0.18),inset_0_1px_0_rgba(255,255,255,0.52)] transition-all duration-300 [font-family:var(--font-display)] ${
                  isScrolled ? "h-10 text-sm" : "h-12 text-base"
                }`}
              >
                DP
              </motion.span>
            </a>

            <nav
              aria-label="Primary"
              className="hidden items-center justify-center lg:flex"
            >
              <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {sections.map((section) => {
                  const isActive = activeId === section.id;

                  return (
                    <li key={section.id} className="relative">
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`group relative block overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                          isActive
                            ? "text-black"
                            : "text-[var(--text-secondary)] hover:-translate-y-0.5 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="desktop-nav-pill"
                            transition={sharedPillTransition}
                            className="absolute inset-0 rounded-full border border-sky-100/40 bg-[linear-gradient(135deg,rgba(186,230,253,0.96),rgba(125,211,252,0.84))] shadow-[0_14px_30px_rgba(56,189,248,0.2),inset_0_1px_0_rgba(255,255,255,0.6)]"
                          />
                        )}

                        <span className={`relative z-10 ${isActive ? "text-black" : ""}`}>
                          {section.label}
                        </span>

                        {!isActive && (
                          <span className="pointer-events-none absolute inset-x-4 bottom-2 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-sky-200/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-end gap-2">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-sky-200/20 bg-[linear-gradient(135deg,rgba(186,230,253,0.96),rgba(56,189,248,0.88))] px-3.5 py-2.5 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(56,189,248,0.22),inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:text-black hover:shadow-[0_22px_48px_rgba(56,189,248,0.28),0_0_30px_rgba(125,211,252,0.16),inset_0_1px_0_rgba(255,255,255,0.6)] focus-visible:text-black focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-4"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.24),transparent_38%,transparent_62%,rgba(255,255,255,0.14))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 text-black">Resume</span>
                <ArrowUpRight
                  size={16}
                  className="relative z-10 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <button
                type="button"
                ref={menuButtonRef}
                aria-expanded={isMenuOpen}
                aria-controls={mobileMenuId}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:hidden"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.nav
              id={mobileMenuId}
              key="mobile-menu"
              aria-label="Mobile navigation"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.22, ease: "easeOut" }
              }
              className={`${shellBaseClassName} fixed! left-4 right-4 top-[5.5rem] z-40 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[1.75rem] p-3 lg:hidden`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.14),transparent_34%)]"
              />

              <div className="relative grid gap-1.5">
                {sections.map((section) => {
                  const isActive = activeId === section.id;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group relative overflow-hidden rounded-[1.15rem] px-4 py-3 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                        isActive
                          ? "text-black"
                          : "text-white/88 hover:bg-white/[0.05]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-pill"
                          transition={sharedPillTransition}
                          className="absolute inset-0 rounded-[1.15rem] border border-sky-100/35 bg-[linear-gradient(135deg,rgba(186,230,253,0.96),rgba(125,211,252,0.84))] shadow-[0_14px_30px_rgba(56,189,248,0.18),inset_0_1px_0_rgba(255,255,255,0.56)]"
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <span className={isActive ? "text-black" : undefined}>
                          {section.label}
                        </span>
                        <span
                          className={`h-2 w-2 rounded-full transition ${
                            isActive ? "bg-slate-950/70" : "bg-sky-200/35"
                          }`}
                        />
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
