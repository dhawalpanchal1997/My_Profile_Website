"use client"

import Section from "@/components/Section"
import { Mail, Linkedin, Github } from "lucide-react"
import { site } from "@/data/resumedata"

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s connect"
      subtitle="Open to meaningful conversations, collaborations, and opportunities."
      className="
        bg-gradient-to-b
        from-[color:var(--royal-ivory)]
        to-[#ebe9e4]
        bg-noise
        relative
      "
    >
      {/* Royal Seal Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-36 bg-[color:var(--royal-gold)]" />

      <div className="mt-12 flex flex-col items-center text-center">
        <p className="max-w-xl text-neutral-700 leading-relaxed">
          If you’re interested in discussing intelligent systems, AI platforms,
          or building something meaningful together, I’d be glad to connect.
        </p>

        {/* Contact Actions */}
        <div className="mt-10 flex items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            className="
              flex items-center gap-2
              rounded-full
              border border-black/10
              px-5 py-3
              text-sm
              text-neutral-900
              hover:bg-black/5
              transition
            "
          >
            <Mail size={16} />
            Email
          </a>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              rounded-full
              border border-black/10
              px-5 py-3
              text-sm
              text-neutral-900
              hover:bg-black/5
              transition
            "
          >
            <Linkedin size={16} />
            LinkedIn
          </a>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              rounded-full
              border border-black/10
              px-5 py-3
              text-sm
              text-neutral-900
              hover:bg-black/5
              transition
            "
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </Section>
  )
}
