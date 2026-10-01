import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dhawal Panchal",
  description:
    "Archive of projects across GenAI, machine learning, cloud, data analytics, and full-stack development.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
