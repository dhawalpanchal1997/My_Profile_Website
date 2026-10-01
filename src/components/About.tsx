"use client";

import Image from "next/image";
import Section from "@/components/Section";
import { education } from "@/data/resumedata";

const principles = [
  "Translate complex technical systems into products people can trust and use.",
  "Balance strong backend engineering with thoughtful frontend clarity.",
  "Create alignment across teams so execution stays fast and intentional.",
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering with product instinct, systems thinking, and AI focus."
      subtitle="I turn AI prototypes into systems teams can operate — most recently shipping agentic workflows and RAG pipelines for production products at Kaya Global in Dallas."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sky-300/15 to-transparent" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image
              src="/images/profile.png"
              alt="Dhawal Panchal portrait"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="surface-card rounded-[2rem] p-7">
            <p className="text-sm uppercase tracking-[0.26em] text-sky-200/80">
              Perspective
            </p>
            <div className="mt-5 space-y-5 text-base leading-8 text-[var(--text-secondary)]">
              <p>
                At Kaya Global I build the platform behind production GenAI features:
                FastAPI services, vector retrieval with pgvector and FAISS, and prompt
                orchestration that cut LLM response latency from minutes to seconds.
              </p>
              <p>
                Before that I shipped full-stack products and enterprise integrations —
                OAuth2/JWT authentication, event-driven AWS Lambda pipelines, and test
                analytics adopted across teams at Accenture. The through-line is
                consistent: clear architecture, measurable outcomes, software people
                use.
              </p>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-7">
            <p className="text-sm uppercase tracking-[0.26em] text-sky-200/80">
              Education
            </p>
            <div className="mt-5 space-y-1">
              <p className="text-base font-semibold text-white">{education.degree}</p>
              <p className="text-base text-[var(--text-secondary)]">{education.school}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {education.period} · {education.honors}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {principles.map((principle, index) => (
              <div
                key={principle}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  0{index + 1}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-100">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
