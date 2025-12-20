"use client"

import { motion } from "framer-motion"
import Section from "./Section"
import { projects } from "@/data/projectsdata"

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Selected projects"
      subtitle="A small selection of systems I’ve designed and built."
      className="bg-[color:var(--bg-surface)] bg-noise"
    >

      <div className="space-y-14">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Project title */}
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-950">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-neutral-700 leading-relaxed">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="
                    text-xs
                    px-3 py-1
                    rounded-full
                    bg-[#f3f1eb]
                    text-neutral-700
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block
                  mt-4
                  text-sm
                  font-medium
                  text-neutral-900
                  hover:underline
                "
              >
                View project →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
