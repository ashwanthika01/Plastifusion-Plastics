"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Factory, Gauge, ShieldCheck, Layers, Wrench, PackageCheck, Truck,
  FlaskConical, Cpu, Car, Stethoscope, ShoppingBag, Settings2, Zap,
  BadgeCheck, ArrowRight, ChevronRight, Activity, Target, LayoutGrid,
  Repeat2, DollarSign, HardDrive, Box, Microscope,
} from "lucide-react";


// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  white:      "#FFFFFF",
  offWhite:   "#F4F8F5",
  lightRule:  "#DCE8E0",
  deepBg:     "#050C08",
  midBg:      "#0A1510",
  green:      "#00B050",
  greenDark:  "#008A3C",
  greenLight: "#33C870",
  greenMuted: "#006630",
  ink:        "#0A1A0F",
  inkMid:     "#2E4A38",
  inkLight:   "#5A7A64",
  steel:      "#8AADA0",
  ice:        "#D8EDE2",
  rule:       "rgba(0,176,80,0.14)",
  ruleDark:   "rgba(0,176,80,0.10)",
  glassBg:    "rgba(255,255,255,0.04)",
  glassBdr:   "rgba(168,196,176,0.10)",
};

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: C.lightRule }}>
      <motion.div className="h-full" style={{ width: w, background: C.green }} />
    </div>
  );
}

// ─── Section eyebrow ──────────────────────────────────────────────────────────
function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-6 shrink-0" style={{ background: C.green }} />
      <span
        className="text-[11px] uppercase tracking-[0.22em] font-mono"
        style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeUp({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = value / 55;
    const t = setInterval(() => {
      s += step;
      if (s >= value) { setN(value); clearInterval(t); }
      else setN(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── Thin hairline divider ────────────────────────────────────────────────────
function Rule({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{ background: dark ? C.ruleDark : C.rule }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
export default function PlastifusionInfrastructure() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <FacilityRail />
      <InjectionSection />
      <ToolRoomSection />
      <TimelineSection />
      <QualityMetrics />
      <SecondaryOpsSection />
      <IndustriesSection />
      <StrengthsSection />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1 · HERO — fits exactly within 100dvh
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        background: C.white,
        color: C.ink,
        height: "100dvh",
        minHeight: "560px",   // never collapse smaller than this on tiny phones
        maxHeight: "1080px",  // cap on very tall monitors so it doesn't feel sparse
      }}
    >
      {/* Ghost text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden
      >
        <span
          className="font-extrabold whitespace-nowrap"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(40px, 14vw, 220px)",
            color: "rgba(0,176,80,0.045)",
            letterSpacing: "0.1em",
          }}
        >
          PLASTIFUSION
        </span>
      </div>

      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,176,80,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,176,80,0.055) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Main content — fills remaining height, never overflows ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div
          className="
            flex-1 flex flex-col min-h-0
            lg:grid lg:grid-cols-[1fr_1px_340px]
            px-5 sm:px-8 lg:px-20
            pt-10 pb-6 lg:py-0
            items-start lg:items-center
            gap-0 overflow-hidden
          "
        >
          {/* LEFT — headline */}
          <div className="w-full flex flex-col justify-center min-h-0 lg:py-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow label="Manufacturing Infrastructure" />
              <h1
                className="leading-[0.9] tracking-[-0.025em] mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  // tighter clamp so the headline never pushes past the fold
                  fontSize: "clamp(32px, 6.5vw, 88px)",
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                World‑Class
                <br />
                <span style={{ color: C.green }}>Precision</span>
                <br />
                Manufacturing
              </h1>
              <p
                className="text-sm lg:text-base max-w-lg leading-relaxed"
                style={{ color: C.inkMid }}
              >
                Over two decades of plastic injection moulding expertise —
                cutting-edge machinery, hardened-steel tooling, and rigorous
                quality systems that deliver from first prototype to millions of units.
              </p>
            </motion.div>

            {/* Spec strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-5 pt-4 border-t grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-5"
              style={{ borderColor: C.lightRule }}
            >
              {[
                { v: "20+",   l: "Years" },
                { v: "160T",  l: "Max Tonnage" },
                { v: "±0.5", l: "mm Tolerance" },
                { v: "800g",  l: "Shot Weight" },
                { v: "10+",   l: "Materials" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-lg sm:text-xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif", color: C.green }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="text-[10px] font-mono uppercase tracking-wide mt-0.5"
                    style={{ color: C.inkLight, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Mobile-only inline key details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 lg:hidden grid grid-cols-2 gap-0 border rounded-xl overflow-hidden"
              style={{ borderColor: C.lightRule }}
            >
              {[
                { label: "Certification", value: "ISO 9001:2015" },
                { label: "Schedule",      value: "24/5 Production" },
                { label: "Tooling",       value: "P20 & H13 Steel" },
                { label: "Capability",    value: "Proto → Mass" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="px-4 py-2.5 border-b border-r last-of-type:border-r-0"
                  style={{ borderColor: C.lightRule }}
                >
                  <div
                    className="text-[9px] uppercase tracking-[0.18em] font-mono mb-0.5"
                    style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {row.label}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: C.ink }}>{row.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Vertical divider — desktop only */}
          <div className="hidden lg:block h-full" style={{ background: C.lightRule }} />

          {/* RIGHT panel — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-0 pl-10 py-10 h-full justify-center"
          >
            {[
              { label: "Facility",       value: "Comsia Industrial Estate, Coimbatore" },
              { label: "Certification",  value: "ISO 9001:2015 Quality System" },
              { label: "Capability",     value: "Prototype → Mass Production" },
              { label: "Schedule",       value: "24/5 Continuous Production" },
              { label: "Tooling",        value: "P20 & H13 Hardened Steel" },
              { label: "Sectors",        value: "Auto · Electronics · Medical · FMCG" },
            ].map((row, i) => (
              <div key={i} className="py-4 border-b" style={{ borderColor: C.lightRule }}>
                <div
                  className="text-[10px] uppercase tracking-[0.2em] font-mono mb-1"
                  style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.label}
                </div>
                <div className="text-sm font-medium" style={{ color: C.ink }}>{row.value}</div>
              </div>
            ))}
            {/* Scroll cue */}
            <motion.div
              className="flex items-center gap-3 mt-6"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <div className="w-8 h-px" style={{ background: C.green }} />
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-mono"
                style={{ color: C.inkLight, fontFamily: "'JetBrains Mono', monospace" }}
              >
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile scroll cue — pinned to bottom */}
        <motion.div
          className="flex items-center justify-center gap-2 pb-6 lg:hidden"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-7" style={{ background: `linear-gradient(to bottom, ${C.green}, transparent)` }} />
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.midBg})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2 · FACILITY RAIL — DARK
// ═══════════════════════════════════════════════════════════════════════════════
const zones = [
  { n: "01", icon: Factory,    label: "Production Floor", sub: "24/7 injection moulding with real-time process monitoring" },
  { n: "02", icon: Wrench,     label: "Tool Room",        sub: "In-house CNC & EDM mould manufacturing" },
  { n: "03", icon: Microscope, label: "Inspection Lab",   sub: "CMM & optical systems at ±0.5 mm" },
  { n: "04", icon: LayoutGrid, label: "Assembly",         sub: "Clean-cell sub-assembly and insert moulding" },
  { n: "05", icon: Truck,      label: "Logistics",        sub: "Full traceability from resin lot to delivery" },
];

function FacilityRail() {
  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: C.midBg, color: C.ice }}
    >
      <div
        className="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
        style={{ background: C.ruleDark }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Facility Overview" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
            }}
          >
            5 Zones. One Seamless{" "}
            <span style={{ color: C.green }}>Ecosystem.</span>
          </h2>
        </FadeUp>

        {/* 2-col on mobile, 3 on sm, 5 on lg */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-l"
          style={{ borderColor: C.ruleDark }}
        >
          {zones.map((z, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(0,176,80,0.07)" }}
                className="border-r border-b lg:border-b-0 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 transition-colors"
                style={{ borderColor: C.ruleDark }}
              >
                <span
                  className="text-[10px] sm:text-[11px] font-mono"
                  style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {z.n}
                </span>
                <z.icon size={20} style={{ color: C.green }} strokeWidth={1.5} />
                <div>
                  <div
                    className="text-xs sm:text-sm font-bold mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {z.label}
                  </div>
                  <div className="text-[11px] sm:text-xs leading-relaxed" style={{ color: C.steel }}>
                    {z.sub}
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3 · INJECTION MOULDING — LIGHT
// ═══════════════════════════════════════════════════════════════════════════════
const materials = [
  "ABS", "Polypropylene", "Polycarbonate", "Nylon PA6", "Nylon PA66",
  "POM Acetal", "HDPE", "LDPE", "TPE / TPR", "GF30", "FR V0",
];

function InjectionSection() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.offWhite }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,176,80,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,176,80,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Injection Moulding" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: C.ink,
            }}
          >
            Machine Fleet &{" "}
            <span style={{ color: C.green }}>Material Range</span>
          </h2>
        </FadeUp>

        {/* Stack on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Spec table */}
          <FadeUp>
            <div
              className="rounded-2xl overflow-hidden border bg-white"
              style={{ borderColor: C.lightRule }}
            >
              <div
                className="px-5 sm:px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: C.lightRule, background: C.offWhite }}
              >
                <Gauge size={18} style={{ color: C.green }} />
                <span
                  className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]"
                  style={{ color: C.inkMid, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Machine Specifications
                </span>
              </div>
              {[
                ["Clamping Force",    "120T – 160T"],
                ["Shot Weight",       "Up to 800 g"],
                ["Tolerance",         "±0.5 mm"],
                ["Process Monitor",   "Real-time SPC"],
                ["Mould Change",      "< 45 minutes"],
                ["Schedule",          "24 / 5 Production"],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b last:border-0"
                  style={{ borderColor: C.lightRule }}
                >
                  <span className="text-xs sm:text-sm" style={{ color: C.inkMid }}>{k}</span>
                  <span
                    className="text-xs sm:text-sm font-bold font-mono"
                    style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Materials */}
          <FadeUp delay={0.12}>
            <div className="flex flex-col gap-6 sm:gap-8">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-2"
                  style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
                >
                  Processable Materials
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: C.inkLight }}>
                  Engineering-grade resins, speciality compounds, and high-performance polymers.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {materials.map((m, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: C.green, color: C.white }}
                    transition={{ duration: 0.18 }}
                    className="px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-medium cursor-default border"
                    style={{
                      background: "rgba(0,176,80,0.07)",
                      borderColor: "rgba(0,176,80,0.2)",
                      color: C.greenMuted,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {m}
                  </motion.span>
                ))}
              </div>

              {/* Tonnage bar */}
              <div
                className="rounded-xl p-4 sm:p-5 border"
                style={{ background: C.white, borderColor: C.lightRule }}
              >
                <div
                  className="flex justify-between text-[10px] sm:text-[11px] font-mono mb-3"
                  style={{ color: C.inkLight, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span>120 T</span>
                  <span style={{ color: C.green }}>Clamping range</span>
                  <span>160 T</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.lightRule }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    style={{ background: `linear-gradient(90deg, ${C.greenDark}, ${C.greenLight})` }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.deepBg})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4 · TOOL ROOM — DARK
// ═══════════════════════════════════════════════════════════════════════════════
const mouldSteps = [
  { label: "Concept",    icon: Activity },
  { label: "DFM Design", icon: Layers },
  { label: "CNC / EDM",  icon: Wrench },
  { label: "Trial Shot", icon: FlaskConical },
  { label: "Validation", icon: ShieldCheck },
  { label: "Production", icon: Factory },
];

const toolHighlights = [
  { title: "P20 & H13 Steel", desc: "Hardened tool steels rated for 500,000+ shots with dimensional stability maintained throughout the tool's life." },
  { title: "Wire EDM",        desc: "Sub-micron wire electrical discharge machining for complex core and cavity geometries impossible by conventional cutting." },
  { title: "CNC 3-Axis",      desc: "High-speed 3-axis CNC machining of base plates, runners, and cavity inserts to ±0.5 mm positioning accuracy." },
  { title: "In-House",        desc: "No outsourcing. Full control of the mould build schedule — faster iterations, lower costs, tighter tolerance handoffs." },
];

function ToolRoomSection() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.deepBg, color: C.ice }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${C.ruleDark} 1px, transparent 1px), linear-gradient(90deg, ${C.ruleDark} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Tool Room" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
            }}
          >
            Mould Engineering,
            <br />
            <span style={{ color: C.green }}>Built In-House.</span>
          </h2>
        </FadeUp>

        {/* 2-col on mobile, 4 on lg */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 border-l border-t"
          style={{ borderColor: C.ruleDark }}
        >
          {toolHighlights.map((t, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(0,176,80,0.06)" }}
                className="border-r border-b p-5 sm:p-7 flex flex-col gap-2 sm:gap-3 min-h-[160px] sm:min-h-[200px]"
                style={{ borderColor: C.ruleDark }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em]"
                  style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-sm sm:text-base font-bold"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {t.title}
                </h3>
                <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: C.steel }}>
                  {t.desc}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Image pair — stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
          {[
            { src: "/injection-molding-machine.jpeg", label: "Exploded Assembly",  desc: "Core, cavity, runner system, and ejector plate subcomponents." },
            { src: "/mold_topworks.jpg",              label: "Cross-Section",       desc: "Internal cooling channels, gate geometry, and draft angle detail." },
          ].map((img, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: C.ruleDark }}>
                <div className="relative h-48 sm:h-72 bg-gray-900">
                  <Image src={img.src} alt={img.label} fill className="object-cover opacity-80" />
                </div>
                <div
                  className="px-4 sm:px-5 py-3 sm:py-4 border-t"
                  style={{ borderColor: C.ruleDark, background: C.midBg }}
                >
                  <div
                    className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {img.label}
                  </div>
                  <div className="text-[11px] sm:text-xs" style={{ color: C.steel }}>{img.desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Process flow */}
        <FadeUp className="mt-8 sm:mt-14">
          <div
            className="rounded-xl border p-5 sm:p-7"
            style={{ borderColor: C.ruleDark, background: C.midBg }}
          >
            <div
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-4 sm:mb-6"
              style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mould Development Path
            </div>
            {/* Wrap freely on mobile */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-1">
              {mouldSteps.map((s, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 12 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border"
                    style={{
                      borderColor: "rgba(0,176,80,0.25)",
                      background: "rgba(0,176,80,0.07)",
                    }}
                  >
                    <s.icon size={12} style={{ color: C.green }} />
                    <span
                      className="text-[11px] sm:text-xs font-mono"
                      style={{ color: C.ice, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {s.label}
                    </span>
                  </motion.div>
                  {i < mouldSteps.length - 1 && (
                    <ChevronRight size={12} style={{ color: C.green, opacity: 0.4 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.offWhite})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5 · TIMELINE — LIGHT
// ═══════════════════════════════════════════════════════════════════════════════
const steps = [
  { n: "01", t: "Requirement Analysis", d: "Part geometry, tolerances, volume, material, and end-use environment reviewed in detail." },
  { n: "02", t: "Material Selection",   d: "Resin grade chosen based on mechanical, thermal, and regulatory requirements." },
  { n: "03", t: "Mould Design",         d: "3D CAD design with DFM analysis, cooling simulation, and gate optimisation." },
  { n: "04", t: "Tool Manufacturing",   d: "CNC and EDM machining of hardened steel core and cavity inserts." },
  { n: "05", t: "Prototype Sampling",   d: "First article samples produced and measured against drawing tolerances." },
  { n: "06", t: "Injection Moulding",   d: "Validated process parameters locked; full production runs initiated." },
  { n: "07", t: "Quality Inspection",   d: "100% visual inspection and CMM measurement at every production shift." },
  { n: "08", t: "Assembly",             d: "Insert fitment, sub-assembly, and functional testing as required." },
  { n: "09", t: "Packaging",            d: "Customer-specified packaging, labelling, and anti-static protection." },
  { n: "10", t: "Delivery",             d: "On-time dispatch with full traceability documentation and Certificate of Conformance." },
];

function TimelineSection() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="End-to-End Process" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: C.ink,
            }}
          >
            Requirement to{" "}
            <span style={{ color: C.green }}>Delivered Part.</span>
          </h2>
        </FadeUp>

        {/* 1-col mobile, 2-col sm, 5-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 sm:gap-x-8 gap-y-0">
          {steps.map((s, i) => (
            <FadeUp key={i} delay={Math.floor(i / 5) * 0.1 + (i % 5) * 0.05}>
              <div
                className="border-l-2 pl-4 py-4 sm:py-5 border-b"
                style={{
                  borderLeftColor: i < 5 ? C.green : C.greenLight,
                  borderBottomColor: C.lightRule,
                }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1.5"
                  style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Step {s.n}
                </span>
                <h4
                  className="text-sm font-bold mb-1 leading-snug"
                  style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
                >
                  {s.t}
                </h4>
                <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: C.inkLight }}>{s.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.deepBg})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6 · QUALITY METRICS — DARK
// ═══════════════════════════════════════════════════════════════════════════════
const metrics = [
  { n: "ISO",   sub: "9001:2015", label: "Quality Certification",  icon: BadgeCheck },
  { n: "±0.5", sub: "mm",        label: "Dimensional Tolerance",  icon: Target },
  { n: "100",   sub: "%",          label: "Batch Inspection",       icon: ShieldCheck },
  { n: "Cpk",   sub: ">1.33",      label: "Process Capability",     icon: Activity },
];

function QualityMetrics() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.deepBg }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${C.ruleDark} 1px, transparent 1px), linear-gradient(90deg, ${C.ruleDark} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        {/* Stack on mobile, 2-col on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12 sm:mb-20">
          <FadeUp>
            <Eyebrow label="Quality Infrastructure" />
            <h2
              className="font-extrabold"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 5vw, 48px)",
                color: C.ice,
              }}
            >
              Quality Is Not a
              <br />
              <span style={{ color: C.green }}>Final Check.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: C.steel }}>
              At Plastifusion, quality is embedded at every process stage —
              not added at the end. Our certified QMS, precision measurement
              hardware, and statistical controls make conformance
              predictable, traceable, and repeatable.
            </p>
            <div className="space-y-3">
              {[
                { l: "Dimensional Accuracy", v: 99 },
                { l: "On-Time Delivery",     v: 96 },
                { l: "First-Pass Yield",     v: 98 },
              ].map((b, i) => (
                <div key={i}>
                  <div
                    className="flex justify-between text-xs mb-1 font-mono"
                    style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>{b.l}</span>
                    <span style={{ color: C.green }}>{b.v}%</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: C.ruleDark }}>
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.15, ease: "easeOut" }}
                      style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenLight})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* 2-col on mobile, 4 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t" style={{ borderColor: C.ruleDark }}>
          {metrics.map((m, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div
                className="border-r border-b p-5 sm:p-8 flex flex-col gap-2 sm:gap-3"
                style={{ borderColor: C.ruleDark }}
              >
                <m.icon size={18} style={{ color: C.green }} strokeWidth={1.5} />
                <div>
                  <div
                    className="font-extrabold leading-none"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(22px, 4vw, 44px)",
                      color: C.ice,
                    }}
                  >
                    {m.n}
                    <span style={{ color: C.green, fontSize: "0.5em" }}>{m.sub}</span>
                  </div>
                  <div
                    className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-mono uppercase tracking-wider"
                    style={{ color: C.steel, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {m.label}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.offWhite})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7 · SECONDARY OPS — LIGHT
// ═══════════════════════════════════════════════════════════════════════════════
const ops = [
  { icon: Layers,       t: "Insert Moulding", d: "Metal inserts co-moulded for maximum pull-out strength." },
  { icon: PackageCheck, t: "Overmoulding",     d: "Two-shot sequential for multi-material assemblies." },
  { icon: Settings2,    t: "Assembly",         d: "Snap-fit, ultrasonic welding, sub-assembly completion." },
  { icon: Wrench,       t: "Finishing",        d: "Deburring, pad printing, UV coating, surface treatment." },
  { icon: Box,          t: "Packaging",        d: "Custom pack with brand labelling and bar-coding." },
];

function SecondaryOpsSection() {
  return (
    <section className="relative py-16 sm:py-28" style={{ background: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Secondary Operations" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: C.ink,
            }}
          >
            Beyond the Moulding Shot.
          </h2>
        </FadeUp>

        {/* 2-col mobile, 3-col sm, 5-col lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {ops.map((op, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ borderColor: C.green, boxShadow: `0 8px 24px rgba(0,176,80,0.12)` }}
                className="bg-white rounded-2xl border p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 h-full"
                style={{ borderColor: C.lightRule }}
              >
                <div className="h-0.5 w-6 sm:w-8 rounded-full" style={{ background: C.green }} />
                <op.icon size={18} style={{ color: C.green }} strokeWidth={1.5} />
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold mb-1"
                    style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
                  >
                    {op.t}
                  </h3>
                  <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: C.inkLight }}>{op.d}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.midBg})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8 · INDUSTRIES — DARK
// ═══════════════════════════════════════════════════════════════════════════════
const industries = [
  { icon: Car,         t: "Automotive", d: "Under-bonnet housings, sensor carriers, clips, and brackets to OEM tolerances.", accent: "#3B82F6", big: true },
  { icon: Cpu,         t: "Electronics",d: "EMC-compliant enclosures and PCB assembly housings.",                           accent: "#8B5CF6", big: false },
  { icon: ShoppingBag, t: "Consumer",   d: "Aesthetically finished closures, handles, and structural frames.",              accent: C.green,   big: false },
  { icon: Stethoscope, t: "Medical",    d: "Cleanroom-compatible diagnostic housings, trays, and disposables.",             accent: "#10B981", big: true },
  { icon: HardDrive,   t: "Industrial", d: "Junction boxes, cable management, and heavy-duty brackets.",                   accent: "#F59E0B", big: false },
];

function IndustriesSection() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.midBg, color: C.ice }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${C.ruleDark} 1px, transparent 1px), linear-gradient(90deg, ${C.ruleDark} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Industries Served" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
            }}
          >
            Precision Parts for
            <br />
            <span style={{ color: C.green }}>Every Demanding Sector.</span>
          </h2>
        </FadeUp>

        {/* 1-col mobile, 2-col sm, bento on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {industries.map((ind, i) => (
            // big cards span 2 cols only on lg, not mobile
            <FadeUp key={i} delay={i * 0.08} className={ind.big ? "lg:col-span-2" : ""}>
              <motion.div
                whileHover={{ borderColor: ind.accent }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border p-5 sm:p-7 flex flex-col gap-3 sm:gap-4 h-full"
                style={{
                  borderColor: C.ruleDark,
                  background: C.glassBg,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${ind.accent}18`, border: `1px solid ${ind.accent}30` }}
                >
                  <ind.icon size={18} style={{ color: ind.accent }} />
                </div>
                <div>
                  <h3
                    className="text-sm sm:text-base font-bold mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {ind.t}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.steel }}>{ind.d}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${C.offWhite})` }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 9 · STRENGTHS — LIGHT
// ═══════════════════════════════════════════════════════════════════════════════
const strengths = [
  { icon: Zap,          t: "Fast Turnaround",          d: "Expedited tooling paths and reserved machine slots for time-critical programmes." },
  { icon: Repeat2,      t: "Repeat Orders in 48 h",    d: "Stored process parameters allow rapid re-initiation of any validated job." },
  { icon: DollarSign,   t: "Cost-Efficient",            d: "In-house tooling eliminates third-party mark-ups; high-efficiency cycles cut unit cost." },
  { icon: Wrench,       t: "Engineering Support",       d: "DFM reviews, material guidance, and tooling consultation from day one." },
  { icon: HardDrive,    t: "500k+ Shot Tooling",        d: "P20 and H13 moulds built for longevity with minimal dimensional wear." },
  { icon: PackageCheck, t: "End-to-End Control",        d: "Single-vendor ownership from resin intake to packaged, labelled delivery." },
];

function StrengthsSection() {
  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-20">
        <FadeUp className="mb-10 sm:mb-16">
          <Eyebrow label="Why Plastifusion" />
          <h2
            className="font-extrabold"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: C.ink,
            }}
          >
            What Manufacturers
            <br />
            <span style={{ color: C.green }}>Come Back For.</span>
          </h2>
        </FadeUp>

        {/* Mobile: card grid  |  Desktop: horizontal list rows */}
        {/* Cards for mobile (< lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
          {strengths.map((s, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className="bg-white rounded-xl border p-4 flex gap-3 items-start"
                style={{ borderColor: C.lightRule }}
              >
                <s.icon size={16} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} strokeWidth={1.5} />
                <div>
                  <div
                    className="text-xs font-bold mb-0.5"
                    style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
                  >
                    {s.t}
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.inkLight }}>{s.d}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Horizontal list rows for desktop (lg+) */}
        <div className="hidden lg:flex flex-col gap-0 border-t" style={{ borderColor: C.lightRule }}>
          {strengths.map((s, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(0,176,80,0.04)" }}
                className="grid grid-cols-[60px_1fr_1fr_80px] items-center gap-6 py-6 px-4 border-b transition-colors rounded-lg"
                style={{ borderColor: C.lightRule }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  0{i + 1}
                </span>
                <div className="flex items-center gap-3">
                  <s.icon size={18} style={{ color: C.green }} strokeWidth={1.5} />
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
                  >
                    {s.t}
                  </span>
                </div>
                <p className="text-sm" style={{ color: C.inkLight }}>{s.d}</p>
                <div className="flex justify-end">
                  <ArrowRight size={16} style={{ color: C.green, opacity: 0.4 }} />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Footer CTA strip */}
        <FadeUp className="mt-10 sm:mt-16">
          <div
            className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
            style={{ borderColor: C.lightRule, background: C.white }}
          >
            <div>
              <div
                className="text-base sm:text-xl font-extrabold mb-1"
                style={{ fontFamily: "'Syne', sans-serif", color: C.ink }}
              >
                Ready to start your next project?
              </div>
              <div className="text-xs sm:text-sm" style={{ color: C.inkLight }}>
                Engineering team typically responds within 48 hours.
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${C.green}44` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto justify-center"
              style={{
                background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
                color: C.white,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Request a Quote
              <ArrowRight size={14} />
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}