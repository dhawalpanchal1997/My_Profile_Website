"use client";

import { useEffect, useRef, useState } from "react";

interface LinkedInEmbedsProps {
  embeds: string[];
}

export default function LinkedInEmbeds({ embeds }: LinkedInEmbedsProps) {
  return (
    <section
      aria-labelledby="linkedin-heading"
      className="w-full max-w-xl"
    >
      <h3
        id="linkedin-heading"
        className="sr-only"
      >
        Featured LinkedIn posts
      </h3>

      <div className="space-y-6">
        {embeds.map((src, index) => (
          <LazyLinkedInEmbed
            key={index}
            src={src}
            title={`LinkedIn post ${index + 1}`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <a
          href="https://www.linkedin.com/in/dhawalpanchalcloud/recent-activity/all/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            text-sm font-medium
            text-white/80
            hover:text-white
            transition
          "
        >
          View more on LinkedIn →
        </a>
      </div>
    </section>
  );
}

/* ---------- Lazy-loaded iframe ---------- */

function LazyLinkedInEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="
        relative
        rounded-xl
        border border-white/15
        bg-black/20
        overflow-hidden
      "
    >
      {visible ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="w-full h-[460px]"
          frameBorder={0}
          allowFullScreen
        />
      ) : (
        <div className="h-[460px] flex items-center justify-center">
          <span className="text-xs text-white/50">
            Loading post…
          </span>
        </div>
      )}
    </div>
  );
}
