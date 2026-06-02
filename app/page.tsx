import Hero from "@/components/hero/hero";
import Overview from "@/components/home/Overview";
import Stats from "@/components/home/stats";
import Solutions from "@/components/home/Solutions";
import Industries from "@/components/home/Industries";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Process from "@/components/home/Process";
import Infrastructure from "@/components/home/Infrastructure";
import Certifications from "@/components/home/Certifications";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Overview />
      <Stats />
      <Solutions />
      <Industries />
      <WhyChooseUs />
      <Process />
      <Infrastructure />
      <Certifications />
      <CTA />
      <Footer />
    </main>
  );
}