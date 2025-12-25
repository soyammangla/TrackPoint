import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
