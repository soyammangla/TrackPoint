import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/footer";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Navbar />
      <Hero />
      <Feature />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
