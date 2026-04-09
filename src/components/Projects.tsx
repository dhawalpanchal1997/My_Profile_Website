"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/Section";
import { projects } from "@/data/projectsdata";

const featuredProjectTitles = [
  "Text-to-SQL Agent",
  "GraphRAG Knowledge Retrieval",
  "DocuMind – RAG-Based AI Research Assistant",
  "DeepSeek Code Companion – AI Coding Assistant",
  "E-Commerce Customer Segmentation & Recommendation System",
];

const featuredProjects = featuredProjectTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work across GenAI, forecasting, and software engineering."
      subtitle="A few representative projects that show how I approach product thinking, implementation quality, and technical range."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <article
            key={project.title}
            className={`surface-card rounded-[2rem] p-6 sm:p-7 ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-sky-100">
                {project.category.trim()}
              </span>
            </div>

            <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-white">
              {project.title}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-slate-100"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link && project.link.startsWith("http") && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
              >
                View Project
                <ArrowUpRight size={16} />
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.10]"
        >
          Browse All Projects
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
