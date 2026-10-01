import { site } from "@/data/resumedata";

export default function NameBanner() {
  return (
    <section
      id="home"
      className="scroll-mt-32 px-6 pt-8 sm:scroll-mt-36 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl [font-family:var(--font-display)]">
          {site.name}
        </h1>
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-secondary)]">
          AI Engineer · {site.location}
        </p>
      </div>
    </section>
  );
}
