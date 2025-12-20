"use client"

import Section from "@/components/Section"
import {
  Database,
  Cpu,
  Cloud,
  Code2,
  Boxes,
  ShieldCheck,
} from "lucide-react"

const skillGroups = [
  {
    title: "Data & AI Platforms",
    icon: Database,
    skills: [
      "Data Engineering",
      "ETL / ELT Pipelines",
      "BigQuery · Snowflake · Redshift",
      "Vector Databases · RAG Systems",
      "ML Feature Stores",
    ],
  },
  {
    title: "AI & Automation",
    icon: Cpu,
    skills: [
      "Generative AI Systems",
      "Prompt Engineering",
      "Agentic Workflows",
      "LLM Orchestration",
      "Evaluation & Guardrails",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      "AWS · GCP · Azure",
      "Docker · Kubernetes",
      "CI/CD Pipelines",
      "Infrastructure as Code",
    ],
  },
  {
    title: "Engineering",
    icon: Code2,
    skills: [
      "Python · TypeScript",
      "Backend Systems",
      "API Design",
      "Scalable Architectures",
    ],
  },
  {
    title: "Platforms & Systems",
    icon: Boxes,
    skills: [
      "Enterprise Platforms",
      "System Integration",
      "Observability",
      "Performance Optimization",
    ],
  },
  {
    title: "Security & Governance",
    icon: ShieldCheck,
    skills: [
      "Data Governance",
      "Access Controls",
      "Compliance-Aware Design",
      "Secure Architectures",
    ],
  },
]

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical codex"
      subtitle="Capabilities developed through building and operating production systems."
      className="
        bg-[#fafafa]
        bg-ai-grid
        relative
      "
    >
      <div className="grid gap-10 md:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = group.icon

          return (
            <div
              key={index}
              className="flex gap-4"
            >
              {/* Icon */}
              <div className="mt-1">
                <Icon
                  size={20}
                  className="text-[color:var(--royal-gold)]"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-semibold text-neutral-950">
                  {group.title}
                </h3>

                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {group.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
