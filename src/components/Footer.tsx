export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-4 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Dhawal Panchal</p>
        <p>Designed to feel more like a modern product launch than a resume dump.</p>
      </div>
    </footer>
  );
}
