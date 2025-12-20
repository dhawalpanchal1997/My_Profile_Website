import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dhawal Panchal | Portfolio",
  description: "AI Engineer | GenAI | Full-Stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundColor: "var(--bg-main)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
