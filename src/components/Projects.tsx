"use client";

import Link from "next/link";
import { projects } from "@/data/projectsdata";

const ALLOWED_CATEGORIES = [
  "GenAI & AI Systems",
  "Machine Learning & Forecasting",
  "Web Development",
];

export default function Projects() {
  const featuredProjects = projects
    .filter((p) => ALLOWED_CATEGORIES.includes(p.category))
    .slice(0, 4); // show only few

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border p-6 hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold mb-2">{project.title}</h4>

              <p className="text-sm text-muted mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded bg-muted"
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

        {/* CTA */}
        <div className="flex justify-end mt-10">
          <Link
            href="/projects"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
