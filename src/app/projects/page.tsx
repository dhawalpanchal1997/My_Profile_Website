"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projectsdata";

const preferredOrder = [
  "GenAI & AI Systems",
  "Machine Learning & Forecasting",
  "Web Development",
  "Cloud & DevOps",
  "Data Analytics & Business Intelligence",
  "Enterprise Systems & Design",
];

const normalizedProjects = projects.map((project) => ({
  ...project,
  category: project.category.trim(),
}));

export default function ProjectsPage() {
  const categories = useMemo(
    () =>
      Array.from(new Set(normalizedProjects.map((project) => project.category))).sort(
        (left, right) => {
          const leftIndex = preferredOrder.indexOf(left);
          const rightIndex = preferredOrder.indexOf(right);

          if (leftIndex === -1 && rightIndex === -1) {
            return left.localeCompare(right);
          }

          if (leftIndex === -1) {
            return 1;
          }

          if (rightIndex === -1) {
            return -1;
          }

          return leftIndex - rightIndex;
        }
      ),
    []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProjects = normalizedProjects.filter(
    (project) => project.category === activeCategory
  );

  return (
    <main className="page-shell min-h-screen px-6 pb-20 pt-10 sm:px-8 lg:px-10">
      <div className="mesh-orb left-[-6rem] top-12 h-64 w-64 bg-sky-400/10" />
      <div className="mesh-orb right-[-8rem] top-[22rem] h-80 w-80 bg-amber-400/8" />

      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back Home
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="pill-label inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-200">
            Archive
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl [font-family:var(--font-display)]">
            A broader view of the projects behind the portfolio.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
            Explore work across GenAI, machine learning, web engineering, cloud,
            analytics, and enterprise systems.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card rounded-[2rem] p-4">
              <p className="px-3 py-2 text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
                Categories
              </p>

              <div className="mt-2 grid gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? "bg-white text-slate-950"
                          : "bg-white/[0.04] text-[var(--text-secondary)] hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">{activeCategory}</h2>
              <p className="text-sm text-[var(--text-muted)]">
                {filteredProjects.length} project
                {filteredProjects.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <article
                  key={project.title}
                  className="surface-card rounded-[2rem] p-6"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
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
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
                    >
                      View Project
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
