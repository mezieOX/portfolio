import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
