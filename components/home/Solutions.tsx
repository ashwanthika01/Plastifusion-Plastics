"use client";

import { motion } from "framer-motion";
import { Cog, Factory, Layers3, Wrench } from "lucide-react";

const services = [
  {
    index: "01",
    icon: Cog,
    title: "Custom Injection Moulding",
    description:
      "High-quality custom plastic component production with precision manufacturing workflows.",
  },
  {
    index: "02",
    icon: Factory,
    title: "Mould Design & Manufacturing",
    description:
      "Single-cavity, multi-cavity, and family mould systems with hardened steel tooling.",
  },
  {
    index: "03",
    icon: Layers3,
    title: "Prototyping & Sampling",
    description:
      "Rapid prototype development and short-run production for faster validation.",
  },
  {
    index: "04",
    icon: Wrench,
    title: "Secondary Operations",
    description:
      "Insert moulding, overmoulding, and assembly services under one roof.",
  },
];

const industries = [
  "Automotive",
  "Electronics",
  "Consumer Goods",
  "Medical",
  "Industrial",
];

export default function SolutionsIndustries() {
  return (
    <section className="bg-[#F8FAF8] py-32">
      <div className="container-custom">

        {/* ── Top Label ── */}
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#006B2D]">
          What We Offer
        </p>

        {/* ── Split Hero Heading ── */}
        <div className="mt-6 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-5xl font-bold leading-[1.1] text-gray-900 lg:text-6xl">
            Complete Plastic
            <br />
            Manufacturing{" "}
            <em className="not-italic text-[#006B2D]">Solutions.</em>
          </h2>

          <p className="max-w-sm text-lg leading-relaxed text-gray-500 lg:pb-2">
            Precision-engineered components for the industries that
            demand the most — built under one roof, delivered at scale.
          </p>
        </div>

        {/* ── Thin Divider ── */}
        <div className="mt-16 h-px w-full bg-green-100" />

        {/* ══════════════════════════════
            SERVICES — numbered editorial list
        ══════════════════════════════ */}
        <div className="mt-16 grid gap-0 divide-y divide-green-100">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group grid cursor-default grid-cols-[56px_1fr_auto] items-center gap-8 py-8 transition-colors duration-300 hover:bg-white lg:grid-cols-[72px_1fr_260px_56px] lg:px-8"
              >
                {/* Number */}
                <span className="font-mono text-sm font-semibold text-[#006B2D] opacity-60">
                  {service.index}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 transition duration-300 group-hover:text-[#006B2D] lg:text-2xl">
                  {service.title}
                </h3>

                {/* Description — hidden on mobile, shown on lg */}
                <p className="hidden text-gray-500 leading-relaxed lg:block">
                  {service.description}
                </p>

                {/* Icon pill */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-white text-[#006B2D] shadow-sm transition duration-300 group-hover:border-[#006B2D] group-hover:bg-[#006B2D] group-hover:text-white">
                  <Icon size={20} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Spacer / Section Break ── */}
        <div className="mt-28 flex items-center gap-6">
          <div className="h-px flex-1 bg-green-100" />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#006B2D]">
            Industries We Serve
          </p>
          <div className="h-px flex-1 bg-green-100" />
        </div>

        {/* ══════════════════════════════
            INDUSTRIES — 2-col split
        ══════════════════════════════ */}
        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">

          {/* Left: sticky editorial text */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-4xl font-bold leading-[1.15] text-gray-900 lg:text-5xl">
              Trusted Across
              <br />
              <em className="not-italic text-[#006B2D]">Multiple Sectors.</em>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-gray-500">
              We manufacture precision-engineered plastic components
              for diverse industries with strict quality standards,
              durability requirements, and production efficiency.
            </p>

            {/* Stat strip */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-green-100 pt-10">
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "20+", label: "Years Experience" },
                { value: "99%", label: "On-Time Delivery" },
                { value: "5", label: "Industries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-[#006B2D]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: industry cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map((industry, i) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-[28px] border border-green-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#006B2D] hover:shadow-xl ${
                  i === 4 ? "sm:col-span-2" : ""
                }`}
              >
                {/* Subtle index */}
                <span className="absolute right-7 top-6 font-mono text-xs font-semibold text-[#006B2D] opacity-25">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Green dot accent */}
                <span className="mb-5 block h-2 w-2 rounded-full bg-[#006B2D] opacity-40 transition-opacity duration-300 group-hover:opacity-100" />

                <h3 className="text-2xl font-bold text-gray-900 transition duration-300 group-hover:text-[#006B2D]">
                  {industry}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-gray-500 transition duration-300">
                  Precision plastic components engineered for
                  industrial-grade performance and durability.
                </p>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}