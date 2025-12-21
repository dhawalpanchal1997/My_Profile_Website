"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Layers, Cpu, Mail } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { site } from "@/data/resumedata";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

interface NavbarProps {
  /** When rendered inside Hero (C2R1) */
  inHero?: boolean;
}

export default function Navbar({ inHero = false }: NavbarProps) {
  const activeId = useScrollSpy(sections.map((s) => s.id));
  const [isCompact, setIsCompact] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(inHero);

  /* ===============================
     Detect Hero visibility
     =============================== */
  useEffect(() => {
    const hero = document.querySelector('[data-rail-theme="dark"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* ===============================
     ORIGINAL compact logic (UNCHANGED)
     =============================== */
  useEffect(() => {
    if (isHeroVisible) {
      setIsCompact(false);
      return;
    }

    const onScroll = () => {
      setIsCompact(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHeroVisible]);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        ${isHeroVisible ? "relative" : "fixed top-0 left-0 right-0"}
        z-50
      `}
    >
      <div className="flex justify-center px-6 pt-1">
        <motion.div
          animate={{
            paddingTop: isCompact ? 8 : 16,
            paddingBottom: isCompact ? 8 : 16,
            backgroundColor: isHeroVisible
              ? "rgba(0,0,0,0)"
              : isCompact
              ? "rgba(245, 245, 245, 0.07)"
              : "rgba(250,250,250,0.75)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            flex items-center
            rounded-2xl
            ${isHeroVisible ? "" : "backdrop-blur border border-black/5 shadow-sm"}
            ${isCompact ? "px-4" : "px-6 max-w-6xl w-full justify-between"}
          `}
        >

          {/* NAV — Text or Icons */}
          <div
            className={`
              flex items-center
              ${isCompact ? "gap-5 justify-center" : "gap-7"}
            `}
          >
            {sections.map((s) => {
              const isActive = activeId === s.id;
              const Icon = s.icon;

              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`
                    relative group transition-colors
                    ${
                      isHeroVisible
                        ? "text-white/70 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {isCompact ? (
                      <motion.span
                        key="icon"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon
                          size={20}
                          className={isActive ? "text-current" : ""}
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={isActive ? "text-current" : ""}
                      >
                        {s.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip (compact only) */}
                  {isCompact && (
                    <span
                      className="
                        pointer-events-none
                        absolute left-1/2 top-full mt-2
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-md
                        bg-[color:var(--royal-gold)]
                        px-2 py-1
                        text-xs
                        text-white
                        opacity-0
                        group-hover:opacity-100
                        transition
                      "
                    >
                      {s.label}
                    </span>
                  )}

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className="
                        absolute
                        -bottom-1.5 left-1/2
                        h-1 w-1
                        -translate-x-1/2
                        rounded-full
                        bg-current
                      "
                    />
                  )}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
