"use client";

import { Github, Linkedin, Mail, Send } from "lucide-react";
import Section from "@/components/Section";
import { site } from "@/data/resumedata";

const links = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "dhawalpanchalcloud",
    href: site.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "dhawalpanchal1997",
    href: site.github,
    icon: Github,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something useful, intelligent, and real."
      subtitle="I’m open to software engineering roles, AI product work, and conversations around scalable systems."
      className="pb-20"
    >
      <div className="surface-card grid gap-6 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="pill-label inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-sky-100">
            <Send size={15} />
            Available for new opportunities
          </div>

          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
            If you&apos;re hiring for AI engineering, platform work, or a strong
            full-stack role with systems depth, I&apos;d be glad to connect.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-300 to-cyan-200 px-5 py-3 text-sm font-semibold !text-slate-950 shadow-[0_14px_30px_rgba(56,189,248,0.24)] transition hover:from-sky-200 hover:to-cyan-100 hover:!text-slate-950 focus-visible:!text-slate-950"
          >
            <Mail size={16} />
            Start a Conversation
          </a>
        </div>

        <div className="grid gap-4">
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
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 transition hover:border-sky-300/30 hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl border border-white/10 p-3 text-sky-200">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base text-white">{item.value}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
