"use client";

import { useState } from "react";
import { projects } from "@/data/projectsdata";

export default function ProjectsPage() {
  const preferredOrder = ["GenAI & AI Systems", "Machine Learning & Forecasting", "Web Development", "Cloud & DevOps", "Data Analytics & Business Intelligence", "Enterprise Systems & Design"];

  const categories = Array.from(new Set(projects.map((p) => p.category))).sort(
    (a, b) => {
      const ia = preferredOrder.indexOf(a);
      const ib = preferredOrder.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    }
  );
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProjects = projects.filter(
    (p) => p.category === activeCategory
  );

  return (
    <main className="relative bg-ai-grid bg-noise bg-ai-glow">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header – same hierarchy as Hero sub-sections */}
          <div className="mb-16 text-center">
            <h1 className="text-3xl font-bold mb-3">Projects</h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
              A curated collection of my work across AI, Machine Learning,
              Analytics, and Engineering.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-12">
            {/* Left Rail – inspired by SideRail */}
            <aside className="col-span-12 md:col-span-3">
              <div className="sticky top-28">
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-5 text-[var(--text-secondary)]">
                  Categories
                </h3>

                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
                          ${
                            activeCategory === category
                              ? "bg-[var(--bg-surface)] shadow-sm border border-[rgba(199,162,76,0.35)]"
                              : "hover:bg-[var(--bg-muted)]"
                          }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Projects Grid – same card system as Home */}
            <div className="col-span-12 md:col-span-9">
              <h2 className="text-xl font-semibold mb-8">{activeCategory}</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.title}
                    className="relative rounded-xl border bg-[var(--bg-surface)] p-6
                               hover:shadow-lg transition"
                  >
                    <h4 className="text-lg font-semibold mb-2">
                      {project.title}
                    </h4>

                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded bg-[var(--bg-muted)]"
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
                        className="text-sm text-[var(--royal-gold)] hover:underline"
                      >
                        View project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
