"use client"

import Image from "next/image"
import Section from "@/components/Section"

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A bit about me"
      subtitle="How I think, what I value, and how I approach building systems."
      className="
        bg-[color:var(--royal-ivory)]
        relative
      "
    >
      {/* AI intelligence layer */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ai-glow opacity-40"
      />

      <div className="relative grid gap-12 md:grid-cols-2 items-center">
        {/* Text */}
        <div className="text-neutral-700 leading-relaxed space-y-5">
          <p>
            I think as a translator, constantly seeking to bridge the gap between complex technical concepts and practical, human needs. 
            I value impact and accessibility above all else, believing that technology—no matter how advanced—is only useful if it intuitively improves how people live and work. 
            This mindset drives me to look beyond the code to the people using it, ensuring that every solution I advocate for is grounded in clarity, continuous learning, and a shared understanding of the problem.
          </p>

          <p>
            When building systems, I approach the process as a collaborative discipline at the intersection of AI and human-centered design. 
            I don’t just build for scalability; I build for usability, ensuring that powerful backend logic is matched with an accessible frontend experience. 
            I prioritize alignment across multidisciplinary teams, using clear communication to synchronize stakeholders and foster an environment where innovation is driven by a unified vision rather than isolated technical efforts.
          </p>

          <p>
            I’m most effective in environments that value long-term thinking,
            strong fundamentals, and disciplined innovation.
          </p>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative h-[360px] w-72 overflow-hidden rounded-2xl border border-black/10">
            <Image
              src="/images/profile.jpg"
              alt="Dhawal Panchal"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
