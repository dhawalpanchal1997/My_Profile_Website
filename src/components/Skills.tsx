"use client";

import {
  BarChart3,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
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

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="Nine skill groups spanning AI depth through delivery range."
      subtitle="What I build with, how I ship it, and how I run it in production — organized by area instead of hidden behind an effect."
    >
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
                <h3 className="text-base font-semibold text-white">
                  {group.title}
                </h3>
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
    </Section>
  );
}
