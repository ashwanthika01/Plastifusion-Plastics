import Hero from "@/components/hero/hero";
import Overview from "@/components/home/Overview";
import Solutions from "@/components/home/Solutions";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Infrastructure from "@/components/home/Infrastructure";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Overview />
      <Solutions />
      <WhyChooseUs />
      <Infrastructure />
      <CTA />
      <Footer />
    </main>
  );
}