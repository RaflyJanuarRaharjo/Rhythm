import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/hero/Hero";
import Trusted from "@/components/sections/Trusted";
import Manifesto from "@/components/sections/Manifesto";
import Features from "@/components/sections/features/Features";
import HowItWorks from "@/components/sections/how-it-works/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Integrations from "@/components/sections/Integrations";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trusted />
        <Manifesto />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Integrations />
      </main>
      <Footer />
    </>
  );
}
