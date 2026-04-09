"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/resumedata";

const links = [
  { href: site.github, label: "GitHub", icon: Github },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export default function SideRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="rounded-full border border-white/10 bg-slate-950/55 p-3 shadow-[0_20px_40px_rgba(2,6,23,0.35)] backdrop-blur">
        <div className="flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={item.label}
                className="rounded-full border border-transparent p-3 text-[var(--text-secondary)] transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
