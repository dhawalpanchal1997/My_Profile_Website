import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dhawal Panchal | AI Engineer",
  description:
    "Portfolio for Dhawal Panchal, focused on GenAI systems, agentic workflows, and full-stack engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]"
      >
        {children}
      </body>
    </html>
  );
}
