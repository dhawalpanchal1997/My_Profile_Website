"use client";

import { useState, type PointerEvent } from "react";
import {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  RefreshCw,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import Section from "@/components/Section";

const skillGroups = [
  {
    title: "AI Engineering",
    icon: Cpu,
    skills: [
      "Generative AI applications",
      "Prompt engineering",
      "Context engineering",
      "LLM orchestration",
      "Agentic systems",
      "AI evaluations",
    ],
  },
  {
    title: "RAG, ML & Data Systems",
    icon: Database,
    skills: [
      "Retrieval-Augmented Generation",
      "Embeddings and vector search",
      "Chunking and retrieval design",
      "ETL / ELT pipelines",
      "ML data flows",
      "Traceability systems",
    ],
  },
  {
    title: "Data Analysis",
    icon: BarChart3,
    skills: [
      "Exploratory data analysis",
      "SQL analytics",
      "Power BI and Tableau",
      "KPI tracking",
      "Data storytelling",
      "Data cleaning and transformation",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      "AWS, GCP, Azure",
      "Docker and Kubernetes",
      "CI/CD pipelines",
      "Infrastructure as Code",
      "Cloud-native deployment",
      "Scalable runtime systems",
    ],
  },
  {
    title: "Backend & Full-Stack Engineering",
    icon: Code2,
    skills: [
      "Python, TypeScript, JavaScript",
      "FastAPI and REST APIs",
      "Microservices",
      "React and Next.js",
      "Platform architecture",
      "Async distributed workflows",
    ],
  },
  {
    title: "Platforms & Systems",
    icon: Boxes,
    skills: [
      "Enterprise integration",
      "System design",
      "Observability",
      "Performance tuning",
      "Production operations",
      "API-based integrations",
    ],
  },
  {
    title: "Security & Governance",
    icon: ShieldCheck,
    skills: [
      "Secure architectures",
      "Access control",
      "Compliance-aware design",
      "Data and AI governance",
      "Responsible AI safeguards",
      "Human-in-the-loop controls",
    ],
  },
  {
    title: "Management & Delivery",
    icon: Users,
    skills: [
      "Stakeholder management",
      "Requirement gathering",
      "Agile / Scrum delivery",
      "Sprint planning",
      "Cross-functional collaboration",
      "Execution tracking",
    ],
  },
  {
    title: "Software & Tools",
    icon: Wrench,
    skills: [
      "Git, GitHub, Bitbucket",
      "Jira and Confluence",
      "Azure DevOps",
      "Postman and Swagger",
      "VS Code and Jupyter",
      "Jenkins, Harness, OpenShift",
    ],
  },
];

const wordCloudSkills = [
  {
    label: "Vector Search",
    position: { left: "18%", top: "10%" },
    motionDepth: 10,
    className:
      "text-[clamp(0.95rem,2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "Context",
    position: { left: "42%", top: "9%" },
    motionDepth: 14,
    className:
      "text-[clamp(1rem,2.2vw,1.6rem)] font-semibold text-slate-300 tracking-[-0.03em]",
  },
  {
    label: "MCP",
    position: { left: "60%", top: "10%" },
    motionDepth: 12,
    className:
      "text-[clamp(0.95rem,2vw,1.45rem)] font-semibold text-sky-200 tracking-[-0.03em]",
  },
  {
    label: "Tool Calling",
    position: { left: "82%", top: "10%" },
    motionDepth: 10,
    className:
      "text-[clamp(0.95rem,2vw,1.35rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "RAG",
    position: { left: "23%", top: "24%" },
    motionDepth: 24,
    className:
      "text-[clamp(2.6rem,8vw,5.2rem)] font-semibold text-sky-100 tracking-[-0.05em]",
  },
  {
    label: "Orchestration",
    position: { left: "56%", top: "23%" },
    motionDepth: 18,
    className:
      "text-[clamp(1.5rem,4.4vw,3rem)] font-semibold text-white/85 tracking-[-0.04em]",
  },
  {
    label: "LLM",
    position: { left: "84%", top: "23%" },
    motionDepth: 22,
    className:
      "text-[clamp(2rem,6vw,3.8rem)] font-semibold text-slate-200 tracking-[-0.05em]",
  },
  {
    label: "Traceability",
    position: { left: "9%", top: "33%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.95rem,2vw,1.3rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "AI",
    position: { left: "46%", top: "43%" },
    motionDepth: 28,
    className:
      "text-[clamp(4.8rem,14vw,9rem)] font-semibold text-white tracking-[-0.05em]",
  },
  {
    label: "Agentic",
    position: { left: "80%", top: "41%" },
    motionDepth: 20,
    className:
      "text-[clamp(1.9rem,5.4vw,3.5rem)] font-semibold text-cyan-100 tracking-[-0.04em]",
  },
  {
    label: "Retrieval",
    position: { left: "17%", top: "43%" },
    motionDepth: 16,
    className:
      "text-[clamp(1.35rem,3.4vw,2.2rem)] font-semibold text-sky-200/90 tracking-[-0.03em]",
  },
  {
    label: "Grounding",
    position: { left: "16%", top: "55%" },
    motionDepth: 12,
    className:
      "text-[clamp(1.05rem,2.4vw,1.55rem)] font-semibold text-slate-300 tracking-[-0.03em]",
  },
  {
    label: "Embeddings",
    position: { left: "30%", top: "62%" },
    motionDepth: 18,
    className:
      "text-[clamp(1.55rem,4.2vw,2.8rem)] font-semibold text-slate-200 tracking-[-0.04em]",
  },
  {
    label: "Prompting",
    position: { left: "56%", top: "62%" },
    motionDepth: 16,
    className:
      "text-[clamp(1.4rem,3.8vw,2.5rem)] font-semibold text-slate-200 tracking-[-0.04em]",
  },
  {
    label: "Evaluations",
    position: { left: "81%", top: "57%" },
    motionDepth: 12,
    className:
      "text-[clamp(1.05rem,2.4vw,1.55rem)] font-semibold text-slate-300 tracking-[-0.03em]",
  },
  {
    label: "Python",
    position: { left: "12%", top: "73%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "FastAPI",
    position: { left: "25%", top: "74%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "LangChain",
    position: { left: "40%", top: "74%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "LangGraph",
    position: { left: "57%", top: "74%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "pgvector",
    position: { left: "73%", top: "74%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "FAISS",
    position: { left: "86%", top: "74%" },
    motionDepth: 10,
    className:
      "text-[clamp(1rem,2.2vw,1.45rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "CrewAI",
    position: { left: "12%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Async",
    position: { left: "23%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Microservices",
    position: { left: "38%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "SQL",
    position: { left: "53%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "APIs",
    position: { left: "62%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Docker",
    position: { left: "72%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "GCP",
    position: { left: "81%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Observability",
    position: { left: "92%", top: "86%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Cloud Run",
    position: { left: "89%", top: "67%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.95rem,2.2vw,1.35rem)] font-semibold text-slate-400 tracking-[-0.03em]",
  },
  {
    label: "Astra DB",
    position: { left: "5%", top: "20%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "BigQuery",
    position: { left: "94%", top: "33%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "React",
    position: { left: "6%", top: "61%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Next.js",
    position: { left: "94%", top: "49%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Prompt Flow",
    position: { left: "33%", top: "32%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Guardrails",
    position: { left: "66%", top: "49%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Knowledge Graphs",
    position: { left: "40%", top: "54%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Semantic Search",
    position: { left: "66%", top: "34%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
  {
    label: "Automation",
    position: { left: "91%", top: "18%" },
    motionDepth: 8,
    className:
      "text-[clamp(0.92rem,2vw,1.2rem)] font-semibold text-slate-500 tracking-[-0.03em]",
  },
];

export default function Skills() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cloudOffset, setCloudOffset] = useState({ x: 0, y: 0 });

  const handleCloudPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setCloudOffset({ x, y });
  };

  const handleCloudPointerLeave = () => {
    setCloudOffset({ x: 0, y: 0 });
  };

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="A skill map that starts with AI depth and flips into execution range."
      subtitle="The front highlights the AI and RAG areas I lean on most. Flip the card to see the full skill set organized by category."
    >
      <div className="skill-flip-scene h-[940px] sm:h-[920px] lg:h-[860px]">
        <div className={`skill-flip-card ${isFlipped ? "is-flipped" : ""}`}>
          <article className="skill-face surface-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_24%)]" />

            <div className="relative flex h-full flex-col">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition hover:bg-white/[0.08]"
                >
                  <RefreshCw size={15} />
                  Show Categories
                </button>
              </div>

              <div
                className="relative mt-4 flex flex-1 items-center justify-center overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(8,15,28,0.96))] px-5 py-8"
                onPointerMove={handleCloudPointerMove}
                onPointerLeave={handleCloudPointerLeave}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_26%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
                <div className="relative h-[520px] w-full max-w-5xl">
                  {wordCloudSkills.map((skill) => (
                    <span
                      key={skill.label}
                      className={`skill-cloud-word absolute whitespace-nowrap leading-none transition-transform duration-300 ease-out hover:scale-110 ${skill.className}`}
                      style={{
                        left: skill.position.left,
                        top: skill.position.top,
                        transform: `translate(-50%, -50%) translate(${cloudOffset.x * skill.motionDepth}px, ${cloudOffset.y * skill.motionDepth}px)`,
                      }}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </article>

          <article className="skill-face skill-face-back surface-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%)]" />

            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-200/80">
                    Categorized View
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                    The same skill set organized into the technical and delivery
                    areas expected from an AI engineer with end-to-end ownership.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-300 to-cyan-200 px-4 py-2 text-sm font-semibold !text-slate-950 shadow-[0_14px_30px_rgba(56,189,248,0.24)] transition hover:from-sky-200 hover:to-cyan-100 hover:!text-slate-950 focus-visible:!text-slate-950"
                >
                  <RefreshCw size={15} />
                  Back To Cloud
                </button>
              </div>

              <div className="skill-face-scroll relative mt-8 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {skillGroups.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-3 text-sky-200">
                            <Icon size={18} />
                          </span>
                          <div>
                            <h3 className="text-base font-semibold text-white">
                              {group.title}
                            </h3>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                              {group.skills.length} Focus Areas
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/[0.08] bg-slate-950/55 px-3 py-2 text-sm text-[var(--text-secondary)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}
