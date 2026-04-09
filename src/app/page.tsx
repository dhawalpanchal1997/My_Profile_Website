import Hero from "@/components/Hero";
import NameBanner from "@/components/NameBanner";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SideRail from "@/components/SideRail";
import InteractiveBackdrop from "@/components/InteractiveBackdrop";

export default function Home() {
  return (
    <div className="page-shell">
      <InteractiveBackdrop />
      <div className="mesh-orb left-[-8rem] top-24 h-64 w-64 bg-sky-400/15" />
      <div className="mesh-orb right-[-6rem] top-[32rem] h-72 w-72 bg-amber-400/10" />
      <div className="mesh-orb left-[20%] bottom-[20rem] h-80 w-80 bg-cyan-400/10" />

      <div className="relative z-10">
        <Navbar />
        <SideRail />

        <main className="relative">
          <NameBanner />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
