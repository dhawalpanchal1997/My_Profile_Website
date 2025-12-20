import Navbar from "@/components/Navbar";
import SideRail from "@/components/SideRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <SideRail />

      <main className="bg-[#f7f7f8] text-neutral-900">
        <Hero />

        <div className="relative">
          <About />
        </div>

        <div className="relative bg-gradient-to-r from-[#eef0f4] to-[#f6f7f9]">
          <Experience />
        </div>

        <div className="relative">
          <Projects />
        </div>

        <div className="relative bg-gradient-to-r from-[#f6f7f9] to-[#eef0f4]">
          <Skills />
        </div>

        <div className="relative bg-gradient-to-b from-[#f6f5f2] to-[#ebe9e4]">
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
