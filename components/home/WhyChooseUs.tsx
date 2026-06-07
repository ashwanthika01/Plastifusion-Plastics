"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   FONTS  — already included in your layout/globals
───────────────────────────────────────────────────────── */

/* ─── Data ─────────────────────────────────────────────── */

const features = [
  {
    index: "01",
    title: "Quality First",
    description:
      "ISO 9001:2015 certified manufacturing with strict multi-stage quality inspection at every press cycle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Fast Turnaround",
    description:
      "2–4 weeks for new moulds and 24–48 hours for repeat production orders — no compromise on speed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Cost Effective",
    description:
      "DFM-driven engineering minimises waste while optimising tooling cost and long-run production economics.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "End-to-End Support",
    description:
      "Engineering guidance from material selection through mould design to final product delivery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Requirement Analysis",
    description:
      "Deep-dive into your design intent, material needs, tolerance spec, and production volumes.",
  },
  {
    number: "02",
    title: "Mould Design",
    description:
      "CAD-driven mould architecture with gate, runner, and cooling optimised for the part geometry.",
  },
  {
    number: "03",
    title: "Prototype & Sampling",
    description:
      "Short-run prototype shots to validate dimensions, surface finish, and functional performance.",
  },
  {
    number: "04",
    title: "Injection Moulding",
    description:
      "High-tonnage production runs on 120T–160T presses with real-time process monitoring.",
  },
  {
    number: "05",
    title: "Inspection & Quality",
    description:
      "CMM measurement, visual inspection, and batch documentation against ISO 9001 protocols.",
  },
  {
    number: "06",
    title: "Final Delivery",
    description:
      "Packed, labelled, and dispatched on schedule — with full traceability records included.",
  },
];

const badges = [
  "Every step documented",
  "ISO 9001:2015 compliant",
  "Full traceability",
];

/* ─── Reusable animation variants ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] },
  }),
};

const clipReveal = {
  hidden: { y: "100%" },
  visible: (delay = 0) => ({
    y: "0%",
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/* ─── Sub-components ────────────────────────────────────── */

function Eyebrow({ label }: { label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className="flex items-center gap-3 mb-8"
    >
      <span className="h-px w-8 bg-[#00b050] flex-shrink-0" />
      <span
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        className="text-[#00b050] text-[10px] font-semibold tracking-[3px] uppercase"
      >
        {label}
      </span>
    </motion.div>
  );
}

function AnimatedHeadline({
  lines,
}: {
  lines: { text: string; variant: "solid" | "outline" | "green" }[];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const colorMap = {
    solid: "text-white",
    outline: "",
    green: "text-[#00b050]",
  };

  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.h2
            custom={i * 0.06}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={clipReveal}
            className={[
              "text-[clamp(2.8rem,6.5vw,5.2rem)] font-black leading-[0.9] tracking-[-0.05em] uppercase",
              colorMap[line.variant],
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              ...(line.variant === "outline"
                ? { WebkitTextStroke: "2.5px #1e4028", color: "transparent" }
                : {}),
            }}
          >
            {line.text}
          </motion.h2>
        </div>
      ))}
    </div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.08}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group relative px-7 py-9 cursor-default overflow-hidden
                 border-r border-b border-white/[0.06] last:border-r-0
                 hover:bg-white/[0.03] transition-all duration-500"
    >
      {/* Ghost index */}
      <p
        className="absolute top-5 right-6 text-[48px] font-black text-white/[0.04]
                   select-none leading-none pointer-events-none"
        style={{ fontFamily: "'Syne', sans-serif" }}
        aria-hidden
      >
        {feature.index}
      </p>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0
                   bg-[#006B2D]/[0.15] border border-[#006B2D]/[0.3]
                   text-[#00b050] group-hover:scale-110
                   group-hover:bg-[#00b050]/[0.15] group-hover:border-[#00b050]/50
                   transition-all duration-500"
      >
        {feature.icon}
      </div>

      <h4
        className="text-[17px] font-bold text-white mb-3
                   group-hover:text-[#00b050] transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {feature.title}
      </h4>

      <p
        className="text-[13.5px] leading-relaxed text-[#526058]"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {feature.description}
      </p>

      <span
        className="absolute bottom-0 left-7 h-px w-0 bg-[#00b050] rounded-full
                   group-hover:w-12 transition-all duration-500"
      />
    </motion.div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      whileHover={{ 
        scale: 1.02, 
        y: -6,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
      }}
      className="group relative overflow-hidden cursor-default flex flex-col
                 bg-[#06090a] hover:bg-[#0a1210] border border-white/[0.035]
                 transition-all duration-500 p-9 rounded-2xl"
    >
      {/* Progress line that fills on hover + scroll */}
      <div className="absolute top-0 left-0 h-0.5 bg-white/10 w-full group-hover:bg-[#00b050]/30 transition-colors" />
      <motion.div 
        className="absolute top-0 left-0 h-0.5 bg-[#00b050] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: index * 0.1 }}
      />

      {/* Large ghost number */}
      <p
        className="text-[72px] font-black leading-none tracking-[-0.04em]
                   text-white/[0.035] select-none mb-[-8px]
                   group-hover:text-[#00b050]/[0.1]
                   transition-colors duration-700"
        style={{ fontFamily: "'Syne', sans-serif" }}
        aria-hidden
      >
        {step.number}
      </p>

      {/* Dot indicator with pulse */}
      <motion.span
        className="block w-2.5 h-2.5 rounded-full bg-[#00b050] mb-6 flex-shrink-0 ring-1 ring-[#00b050]/30"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
      />

      <h4
        className="text-[18px] font-bold text-white mb-4 leading-tight
                   group-hover:text-[#00b050] transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {step.title}
      </h4>

      <p
        className="text-[13.5px] leading-[1.75] text-[#4d5c52] flex-1"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {step.description}
      </p>

      {/* Bottom accent */}
      <div className="mt-auto pt-8">
        <span
          className="block h-px w-0 bg-gradient-to-r from-[#00b050] to-transparent group-hover:w-full transition-all duration-700"
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function WhyChooseUsProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.9, 1.15, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#06090a] text-white overflow-hidden py-12"
      style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
    >
      {/* Noise + grid overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "140px",
        }}
      />

      {/* Ambient glows - more compact */}
      <motion.div
        aria-hidden
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2
                   w-[620px] h-[380px] rounded-full opacity-10"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(ellipse at center, #00a845 0%, transparent 65%)" }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-12">

        {/* BLOCK 1 — Why Choose Us */}
        <div className="pt-16 pb-16">
          <Eyebrow label="Why Choose Us" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
            <AnimatedHeadline
              lines={[
                { text: "Engineering", variant: "solid" },
                { text: "Excellence", variant: "outline" },
                { text: "Backed.", variant: "green" },
              ]}
            />

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2}
              className="text-[15.5px] leading-relaxed text-[#7a8a80] max-w-md"
            >
              Two decades of precision manufacturing has taught us one truth — quality isn't a department. It's a discipline woven into every process, every press cycle, every part we ship.
            </motion.p>
          </div>

          {/* Compact feature grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.06]">
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

        {/* BLOCK 2 — Manufacturing Process */}
        <div className="pt-16 pb-20">
          <Eyebrow label="Manufacturing Process" />

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16">
            <AnimatedHeadline
              lines={[
                { text: "Streamlined", variant: "solid" },
                { text: "Workflow.", variant: "green" },
              ]}
            />

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.15}
              className="text-[12.5px] text-[#445048] max-w-[170px] text-right leading-relaxed hidden lg:block"
            >
              Six precision steps from brief to boxed product.
            </motion.p>
          </div>

          {/* Enhanced workflow with stagger + hover */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </motion.div>

          {/* Badges - compact */}
          <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center gap-x-10 gap-y-6">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.15 + i * 0.1}
                className="flex items-center gap-3"
              >
                <span className="h-px w-7 bg-[#00b050]" />
                <span
                  className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3a4d40]"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}