export default function Footer() {
  return (
    <footer className="py-12 text-center text-sm text-neutral-500">
      <div className="mb-3 h-px w-24 mx-auto bg-[color:var(--royal-gold)]" />
      <p>
        © {new Date().getFullYear()} Dhawal Panchal
      </p>
    </footer>
  )
}
