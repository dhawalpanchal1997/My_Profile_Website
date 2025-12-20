"use client"

import { useState } from "react"
import Section from "@/components/Section"
import { experience } from "@/data/resumedata"

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional record"
      subtitle="A selection of roles where I designed, built, and scaled intelligent systems."
      className="
        bg-[color:var(--royal-stone)]
        bg-ai-grid
        relative
      "
    >
      <div className="divide-y divide-black/10">
        {experience.map((exp, index) => {
          const isOpen = openIndex === index

          return (
            <div key={index} className="py-8">
              {/* Header */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-950">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      {exp.company} · {exp.location}
                    </p>
                  </div>

                  <span className="text-sm text-neutral-500">
                    {exp.duration}
                  </span>
                </div>
              </button>

              {/* Details */}
              {isOpen && (
                <ul className="mt-6 space-y-3 text-neutral-700 leading-relaxed">
                  {exp.points.map((point, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[color:var(--royal-gold)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
