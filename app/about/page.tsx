"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const GREEN = "#00b050";
const GREEN_DARK = "#006B2D";
const OFF_WHITE = "#FAFAF8";
const DARK = "#0a0a0a";
const DARK_2 = "#111111";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function ClipReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "102%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "20+ Years of Precision",
  "ISO 9001:2015 Certified",
  "±0.05mm Tolerances",
  "120T – 160T Machines",
  "24–48hr Repeat Delivery",
  "End-to-End Manufacturing",
];

function Ticker({ dark = false }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        background: dark ? DARK_2 : OFF_WHITE,
      }}
    >
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}
          >
            <span style={{ color: GREEN }}>✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
function StatCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value);
    const duration = 1800;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.floor(num * (step / steps)));
      if (step >= steps) {
        setCount(num);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div
        className="text-6xl md:text-7xl font-black tracking-tight leading-none"
        style={{ color: GREEN, fontFamily: "'DM Sans', sans-serif" }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-xs tracking-[0.18em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── DIRECTOR CARD ────────────────────────────────────────────────────────────
function DirectorCard({ name, role, title, description, index, imagePlaceholder }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="group relative flex flex-col overflow-hidden"
      style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* IMAGE AREA */}
      <div className="relative overflow-hidden aspect-[3/4] w-full">
        {/* Gradient placeholder simulating a dark portrait */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: imagePlaceholder }}
        />
        {/* Overlay grain */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(0,176,80,0.08) 0%, transparent 60%), linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        {/* Index number */}
        <div
          className="absolute top-5 left-5 text-xs tracking-[0.25em] uppercase font-bold"
          style={{ color: GREEN }}
        >
          0{index + 1}
        </div>

        {/* Bottom label strip */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div
            className="text-xs tracking-[0.2em] uppercase font-bold mb-1"
            style={{ color: GREEN }}
          >
            {role}
          </div>
          <div
            className="text-2xl font-black tracking-tight"
            style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
          >
            {name}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        {/* Title pill */}
        <div className="inline-flex items-center gap-2 self-start">
          <div className="w-6 h-px" style={{ background: GREEN }} />
          <span
            className="text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {title}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {description}
        </p>

        {/* Hover line */}
        <div className="mt-auto pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between">
            <span
              className="text-xs tracking-[0.15em] uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Plastifusion Plastics
            </span>
            <div
              className="w-8 h-8 flex items-center justify-center border"
              style={{ borderColor: "rgba(0,176,80,0.3)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke={GREEN} strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CAPABILITY ROW ───────────────────────────────────────────────────────────
function CapabilityRow({ label, value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="flex items-start gap-6 py-6 border-b"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      <div
        className="text-xs tracking-[0.15em] uppercase font-bold mt-1 w-32 shrink-0"
        style={{ color: GREEN }}
      >
        {label}
      </div>
      <div
        className="text-base font-medium leading-snug"
        style={{ color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}
      >
        {value}
      </div>
    </motion.div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const directors = [
    {
      name: "Rajesh Kumar",
      role: "Managing Director",
      title: "The Founder",
      description:
        "With over two decades steering Plastifusion, Rajesh built the company from a single machine to a full-scale precision manufacturing facility. His deep command of injection moulding physics and materials science is the backbone of every component we produce.",
      imagePlaceholder:
        "linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 40%, #0a0a0a 100%)",
    },
    {
      name: "Priya Kumar",
      role: "Director – Operations",
      title: "The Executor",
      description:
        "Priya drives the operational engine — from ISO compliance and toolroom scheduling to delivery timelines and vendor relationships. Her systems-first approach ensures every order, prototype or mass run, ships on spec and on time.",
      imagePlaceholder:
        "linear-gradient(135deg, #1a2010 0%, #141a0d 40%, #0a0a0a 100%)",
    },
    {
      name: "Arun Selvam",
      role: "Technical Director",
      title: "The Craftsman",
      description:
        "Arun leads the in-house toolroom and DFM engineering team. His precision-first mindset — honed across automotive and medical sectors — means every mould is built with micron-level intent and tool life measured in millions of shots.",
      imagePlaceholder:
        "linear-gradient(135deg, #101a18 0%, #0d1a16 40%, #0a0a0a 100%)",
    },
  ];

  const capabilities = [
    { label: "Tonnage", value: "120T to 160T injection moulding machines" },
    { label: "Materials", value: "ABS, PP, PC, Nylon, POM, HDPE, LDPE, TPE — Glass-filled & Flame-retardant grades" },
    { label: "Tolerance", value: "±0.05mm for all critical dimensions" },
    { label: "Volumes", value: "Prototype sampling through full mass production runs" },
    { label: "Tooling", value: "Single-cavity, multi-cavity, and family moulds with hot/cold runner systems" },
    { label: "Turnaround", value: "2–4 weeks for new moulds · 24–48 hrs for repeat orders" },
    { label: "Certification", value: "ISO 9001:2015 Certified with 100% inspection protocol" },
  ];

  const industries = [
    { name: "Automotive", items: "Clips, connectors, dashboards, housings" },
    { name: "Electronics", items: "Enclosures, switches, cable glands" },
    { name: "Consumer Goods", items: "Kitchenware, containers, appliance parts" },
    { name: "Medical", items: "Non-implantable components, casings, disposables" },
    { name: "Industrial", items: "Gears, rollers, custom fixtures" },
  ];

  return (
    <main
      style={{ fontFamily: "'DM Sans', sans-serif", background: DARK }}
      className="min-h-screen"
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: DARK }}
      >
        {/* Parallax background grid */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Radial green glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 15% 80%, rgba(0,176,80,0.12) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Eyebrow */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-0 pt-40">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px" style={{ background: GREEN }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: GREEN }}
              >
                Who We Are
              </span>
            </div>
          </FadeUp>

          {/* Giant headline */}
          <div className="overflow-hidden mb-2">
            <ClipReveal delay={0.05}>
              <h1
                className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tight text-white uppercase"
              >
                Built on
              </h1>
            </ClipReveal>
          </div>
          <div className="overflow-hidden mb-2">
            <ClipReveal delay={0.12}>
              <h1
                className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tight uppercase"
                style={{
                  WebkitTextStroke: `2px ${GREEN}`,
                  color: "transparent",
                }}
              >
                Precision.
              </h1>
            </ClipReveal>
          </div>
          <div className="overflow-hidden">
            <ClipReveal delay={0.2}>
              <h1
                className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tight text-white uppercase"
              >
                Driven by
              </h1>
            </ClipReveal>
          </div>
          <div className="overflow-hidden mb-16">
            <ClipReveal delay={0.28}>
              <h1
                className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tight uppercase"
                style={{ color: GREEN }}
              >
                Quality.
              </h1>
            </ClipReveal>
          </div>

          {/* Descriptor row */}
          <FadeUp delay={0.4}>
            <div
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-20 border-t pt-8"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p
                className="max-w-md text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Plastifusion Plastics Pvt. Ltd. has spent over two decades engineering
                precision plastic components that power industries from automotive
                dashboards to medical-grade disposables — all from our facility in
                Coimbatore, India.
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Est. 2003
                </span>
                <div className="w-16 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Coimbatore, India
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <Ticker dark />

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section style={{ background: DARK_2 }} className="py-28 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <StatCounter value="20" suffix="+" label="Years of experience" />
          <StatCounter value="500" suffix="+" label="Components delivered" />
          <StatCounter value="5" suffix="" label="Industries served" />
          <StatCounter value="100" suffix="%" label="Inspection rate" />
        </div>
      </section>

      {/* ── STORY SECTION ────────────────────────────────────────────────── */}
      <section style={{ background: OFF_WHITE }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <FadeUp>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-px" style={{ background: GREEN }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: GREEN }}
              >
                Our Story
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left — big headline */}
            <div>
              <div className="overflow-hidden mb-3">
                <ClipReveal>
                  <h2
                    className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tight uppercase"
                    style={{ color: "#0a0a0a" }}
                  >
                    Two decades.
                  </h2>
                </ClipReveal>
              </div>
              <div className="overflow-hidden mb-3">
                <ClipReveal delay={0.08}>
                  <h2
                    className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.9] tracking-tight uppercase"
                    style={{
                      WebkitTextStroke: `2px ${GREEN_DARK}`,
                      color: "transparent",
                    }}
                  >
                    One standard.
                  </h2>
                </ClipReveal>
              </div>
            </div>

            {/* Right — prose */}
            <div className="space-y-6">
              <FadeUp>
                <p className="text-base leading-relaxed" style={{ color: "#555" }}>
                  Plastifusion began with a single injection moulding machine and a
                  conviction that precision is non-negotiable. Over 20 years, we've scaled
                  our infrastructure, diversified our material expertise, and earned ISO
                  9001:2015 certification — but the core principle has never changed: every
                  part we produce has to be right.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base leading-relaxed" style={{ color: "#555" }}>
                  Today, our in-house toolroom designs and manufactures moulds using
                  hardened steel systems engineered for millions of cycles. Our DFM-first
                  approach means we catch problems at the design stage — reducing material
                  waste, cutting lead times, and delivering parts your engineers can trust.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-base leading-relaxed" style={{ color: "#555" }}>
                  From prototype sampling to mass production, from automotive connectors to
                  medical-grade casings — Plastifusion is where precision meets production.
                </p>
              </FadeUp>

              {/* Quote mark */}
              <FadeUp delay={0.3}>
                <div
                  className="mt-10 pl-6 border-l-2"
                  style={{ borderColor: GREEN }}
                >
                  <p
                    className="text-lg font-semibold italic leading-snug"
                    style={{ color: "#1a1a1a" }}
                  >
                    "Quality isn't a checkpoint — it's the process."
                  </p>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mt-3"
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  >
                    — Plastifusion Leadership
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTOR PROFILES ────────────────────────────────────────────── */}
      <section style={{ background: DARK }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ background: GREEN }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: GREEN }}
              >
                Leadership
              </span>
            </div>
          </FadeUp>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="overflow-hidden">
                <ClipReveal>
                  <h2
                    className="text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[0.88] tracking-tight text-white uppercase"
                  >
                    Three perspectives.
                  </h2>
                </ClipReveal>
              </div>
              <div className="overflow-hidden">
                <ClipReveal delay={0.08}>
                  <h2
                    className="text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[0.88] tracking-tight uppercase"
                    style={{ color: GREEN }}
                  >
                    One standard.
                  </h2>
                </ClipReveal>
              </div>
            </div>
            <FadeUp delay={0.2}>
              <p
                className="max-w-sm text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Plastifusion is led by a leadership team that combines decades of
                manufacturing expertise with relentless operational discipline.
              </p>
            </FadeUp>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {directors.map((director, i) => (
              <DirectorCard key={i} {...director} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section style={{ background: OFF_WHITE }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ background: GREEN }} />
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: GREEN }}
              >
                Capabilities
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <div className="overflow-hidden mb-4">
                <ClipReveal>
                  <h2
                    className="text-[clamp(2.5rem,4vw,4.5rem)] font-black leading-[0.9] tracking-tight uppercase"
                    style={{ color: "#0a0a0a" }}
                  >
                    Engineered for
                  </h2>
                </ClipReveal>
              </div>
              <div className="overflow-hidden mb-12">
                <ClipReveal delay={0.08}>
                  <h2
                    className="text-[clamp(2.5rem,4vw,4.5rem)] font-black leading-[0.9] tracking-tight uppercase"
                    style={{
                      WebkitTextStroke: `2px ${GREEN_DARK}`,
                      color: "transparent",
                    }}
                  >
                    every spec.
                  </h2>
                </ClipReveal>
              </div>

              {/* Capability rows */}
              <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                {capabilities.map((cap, i) => (
                  <CapabilityRow key={i} index={i} label={cap.label} value={cap.value} />
                ))}
              </div>
            </div>

            {/* Right — Industries */}
            <FadeUp delay={0.2} className="pt-0 lg:pt-6">
              <div
                className="p-10"
                style={{ background: DARK, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-px" style={{ background: GREEN }} />
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: GREEN }}
                  >
                    Industries We Serve
                  </span>
                </div>

                <div className="space-y-0">
                  {industries.map((ind, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col gap-1 py-6 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="text-base font-bold"
                        style={{ color: "#fff" }}
                      >
                        {ind.name}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {ind.items}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TICKER 2 ─────────────────────────────────────────────────────── */}
      <Ticker dark />

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section
        className="relative py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
        style={{ background: DARK_2 }}
      >
        {/* Green glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 85% 50%, rgba(0,176,80,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-14">
          <div>
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px" style={{ background: GREEN }} />
                <span
                  className="text-xs tracking-[0.25em] uppercase font-semibold"
                  style={{ color: GREEN }}
                >
                  Next Steps
                </span>
              </div>
            </FadeUp>
            <div className="overflow-hidden">
              <ClipReveal>
                <h2
                  className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.85] tracking-tight text-white uppercase"
                >
                  Let's build
                </h2>
              </ClipReveal>
            </div>
            <div className="overflow-hidden">
              <ClipReveal delay={0.08}>
                <h2
                  className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.85] tracking-tight uppercase"
                  style={{ color: GREEN }}
                >
                  together.
                </h2>
              </ClipReveal>
            </div>
          </div>

          <FadeUp delay={0.2} className="flex flex-col gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-4 px-10 py-5 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: GREEN,
                color: "#fff",
                border: `1px solid ${GREEN}`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = GREEN;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = GREEN;
                e.currentTarget.style.color = "#fff";
              }}
            >
              Request a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-4 px-10 py-5 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              View Our Capabilities →
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}