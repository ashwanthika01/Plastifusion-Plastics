import Hero from "@/components/hero/hero";
import Overview from "@/components/home/Overview";
import Solutions from "@/components/home/Solutions";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Infrastructure from "@/components/home/Infrastructure";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Plastifusion Plastics",

  description:
    "Plastifusion Plastics is a trusted manufacturer of precision plastic injection moulded components serving industrial and engineering sectors with quality and reliability.",

  keywords: [
    "Plastic Injection Moulding",
    "Injection Moulding Company",
    "Plastic Components Manufacturer",
    "Industrial Plastic Components",
  ],
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Overview />
      <Solutions />
      <WhyChooseUs />
      <Infrastructure />
      <FAQ />
      <CTA />
    </main>
  );
}