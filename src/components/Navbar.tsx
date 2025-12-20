"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Layers, Cpu, Mail } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { site } from "@/data/resumedata";
import { Moon, Sun } from "lucide-react";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "My Self", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "My Work", icon: Layers },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const activeId = useScrollSpy(sections.map((s) => s.id));
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex justify-center px-6 pt-4">
        <motion.div
          animate={{
            paddingTop: isCompact ? 8 : 16,
            paddingBottom: isCompact ? 8 : 16,
            backgroundColor: isCompact
              ? "rgba(245, 245, 245, 0.07)"
              : "rgba(250,250,250,0.75)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            flex items-center
            rounded-2xl
            backdrop-blur
            border border-black/5
            shadow-sm
            ${isCompact ? "px-4" : "px-6 max-w-6xl w-full justify-between"}
          `}
        >
          {/* LEFT — Profile (only on Hero) */}
          <AnimatePresence>
            {!isCompact && (
              <motion.a
                href="#home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4"
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.avif"
                    alt={site.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <span className="flex items-baseline gap-2 leading-none">
                  <span className="text-lg font-semibold tracking-tight text-neutral-900">
                    Dhawal
                  </span>
                  <span className="text-sm font-medium tracking-widest uppercase text-neutral-500">
                    Panchal
                  </span>
                </span>
              </motion.a>
            )}
          </AnimatePresence>

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
                  className="
                    relative
                    group
                    text-neutral-500
                    hover:text-neutral-900
                    transition-colors
                  "
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
                          className={isActive ? "text-neutral-900" : ""}
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={isActive ? "text-neutral-900" : ""}
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
                        bg-neutral-900
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
