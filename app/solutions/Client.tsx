"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";


const G   = "#00903F";
const GL  = "#00b050";
const BG  = "#F5F4F0";
const BG2 = "#ECEAE4";
const BG3 = "#E2E0D8";
const INK = "#0F0F0E";
const INK2= "#5A584F";
const INK3= "#9A9890";
const WH  = "#FFFFFF";

// ─── FONT IMPORT ──────────────────────────────────────────────────────────────
// Add this to your global CSS / layout:
// @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
// The DISPLAY_FONT constant is used on all section headings for a tighter,
// more legible condensed look on mobile without changing any desktop sizing.
const DISPLAY_FONT = "'Barlow Condensed', 'Arial Narrow', sans-serif";

function CR({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "106%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1], delay }}
      >{children}</motion.div>
    </div>
  );
}

function FU({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >{children}</motion.div>
  );
}

function WipeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >{children}</motion.div>
  );
}

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
// MOBILE-ALIGNMENT FIX: the eyebrow's "line — label — line" row used the flex
// default (justify-start), so it always hugged the left edge even when a
// parent had text-center. Added justify-center on mobile, justify-start
// (= original) from lg upward.
function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-4 mb-7">
      <div className="w-8 h-px" style={{ background: G }} />
      <span className="text-[10px] tracking-[0.32em] uppercase font-bold" style={{ color: G }}>{label}</span>
      <div className="w-8 h-px" style={{ background: dark ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.1)" }} />
    </div>
  );
}

function useCountUp(target: string, duration: number = 1.6, start: boolean = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * numeric));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numeric);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden"
      style={{ background: BG, height: "100dvh", minHeight: 600 }}>
      <motion.div className="absolute inset-0 pointer-events-none z-20"
        style={{ background: `linear-gradient(105deg, transparent 0%, rgba(0,144,63,0.055) 48%, transparent 52%)` }}
        initial={{ x: "-120%" }}
        animate={{ x: "220%" }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(0,144,63,0.18) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.55,
      }} />
      <svg className="absolute top-0 right-0 pointer-events-none" width="220" height="220" style={{ opacity: 0.06 }}>
        <path d="M220 0 L220 220 L0 220" fill="none" stroke={G} strokeWidth="1"/>
        <path d="M220 40 L220 220 L40 220" fill="none" stroke={G} strokeWidth="0.5"/>
      </svg>
      <div style={{ height: 72, flexShrink: 0 }} />

      {/* Main content — tighter horizontal padding on mobile */}
      <div className="flex-1 min-h-0 flex flex-col justify-between px-5 sm:px-8 md:px-16 lg:px-24 py-8 md:py-10">
        <div>
          <FU delay={0.06}><Eyebrow label="Our Solutions" /></FU>
          {/* MOBILE-ALIGNMENT FIX: center the three stacked headline lines on
              mobile/tablet; revert to left at lg (original behaviour). */}
          <div style={{ marginTop: 8 }} className="text-center lg:text-left">
            <CR delay={0.12}>
              <h1 style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                fontSize: "clamp(3rem,8vw,7.5rem)",
                lineHeight: 0.88,
                color: INK,
              }}>
                Precision
              </h1>
            </CR>
            <CR delay={0.20}>
              <h1 style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                fontSize: "clamp(3rem,8vw,7.5rem)",
                lineHeight: 0.88,
                WebkitTextStroke: `2px ${G}`,
                color: "transparent",
              }}>
                Plastic
              </h1>
            </CR>
            <CR delay={0.28}>
              <h1 style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                fontSize: "clamp(3rem,8vw,7.5rem)",
                lineHeight: 0.88,
                color: G,
              }}>
                Components.
              </h1>
            </CR>
          </div>
        </div>

        {/* MOBILE-ALIGNMENT FIX: items-start -> items-center on mobile so the
            paragraph block and the stat-card row are centered as a unit;
            text-center -> lg:text-left cascades to the paragraph and the
            number/label inside each stat card. lg behaviour unchanged. */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-12 text-center lg:text-left">
          <FU delay={0.45}>
            <p className="text-sm sm:text-base leading-relaxed font-light max-w-[46ch]" style={{ color: INK2 }}>
              Through advanced injection moulding technology. From concept to mass
              production — durable, precise, and cost-effective parts for five industries.
            </p>
          </FU>

          {/* Stat cards — shrink padding on mobile so they don't overflow */}
          <div className="flex gap-0 shrink-0 w-full lg:w-auto">
            {[["20+", "Years Exp."], ["3", "Machines"], ["±0.5", "mm Tolerance"]].map(([n, l], i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col flex-1 lg:flex-none px-4 sm:px-6 lg:px-8 py-4 lg:py-5"
                style={{
                  borderLeft: `1px solid rgba(0,144,63,0.25)`,
                  borderRight: i === 2 ? `1px solid rgba(0,144,63,0.25)` : "none",
                }}>
                <span className="font-black tracking-tight" style={{ fontSize: "clamp(1.6rem,4vw,2.25rem)", lineHeight: 1, color: G }}>{n}</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold mt-1" style={{ color: INK3 }}>{l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CAP BAND ─────────────────────────────────────────────────────────────────
// MOBILE-ALIGNMENT FIX: center each stat callout's value + label below md
// (this section's own "desktop" breakpoint is md:grid-cols-4), revert to
// left at md (original).
function CapBandItem({ c, i }: { c: { val: string; label: string }; i: number }) {
  const fromLeft = i % 2 === 0;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
      className="flex flex-col gap-1.5 p-5 sm:p-8 text-center md:text-left"
      style={{ background: BG2 }}>
      <span className="font-black tracking-tight" style={{ fontSize: "clamp(1.1rem,3vw,1.75rem)", color: G }}>{c.val}</span>
      <span style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: INK3, fontWeight: 600 }}>{c.label}</span>
    </motion.div>
  );
}

function CapBand() {
  const items = [
    { val: "120T–160T", label: "Clamping Force" },
    { val: "±0.5mm",   label: "Critical Tolerance" },
    { val: "8-12 wks",   label: "New Mould Lead Time" },
    { val: "48 hr",  label: "Repeat Order Turnaround" },
    { val: "100%",      label: "Part Inspection" },
    { val: "1→∞",       label: "Prototype to Mass Prod." },
    { val: "370 cm³",   label: "Max Shot Volume (160T)" },
    { val: "341 g",     label: "Max Shot Weight" },
  ];
  return (
    <section style={{ background: BG3, borderTop: `1px solid rgba(0,0,0,0.07)`, borderBottom: `1px solid rgba(0,0,0,0.07)` }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
        {items.map((c, i) => <CapBandItem key={i} c={c} i={i} />)}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: "01", title: "Custom Injection Moulding",
    desc: "End-to-end production of plastic parts with full support to optimise cost and quality. From material selection through moulding to final QC — all under one roof.",
    tags: ["ABS", "PP", "PC", "Nylon", "POM", "HDPE", "TPE", "Glass-filled"],
    detail: "Our 3-machine floor runs Yizumi UN160SKIII (160T) and two UN120SKIII (120T) horizontally, covering shot weights from 227g up to 341g and screw diameters of 43–48mm.",
  },
  {
    n: "02", title: "Mould Design & Manufacturing",
    desc: "In-house toolroom builds single-cavity, multi-cavity, and family moulds in hardened steel — designed for millions of production cycles with minimal maintenance.",
    tags: ["Hot Runner", "Cold Runner", "Single Cavity", "Multi Cavity", "Family Mould"],
    detail: "We engineer both hot runner and cold runner systems. Mould thickness range: 145–460mm. Platen sizes up to 685×665mm. 5 ejector pin holes standard.",
  },
  {
    n: "03", title: "Prototyping & Sampling",
    desc: "Rapid samples for design validation. Short-run production to reduce lead time and de-risk your product launch before committing to full tooling.",
    tags: ["T1 Samples", "Design Validation", "Short Run", "DFM Review"],
    detail: "Our DFM-first approach means we catch costly design errors before steel is cut. Typical sample delivery in 8-12 weeks from design sign-off.",
  },
  {
    n: "04", title: "Secondary Operations",
    desc: "Insert moulding, overmoulding, and assembly all under one roof. Reduces your supply chain touchpoints and delivers faster, cleaner turnaround.",
    tags: ["Insert Moulding", "Overmoulding", "Assembly", "Ultrasonic Welding"],
    detail: "Consolidating secondary ops with moulding eliminates inter-supplier logistics, reduces handling damage, and cuts total lead time by up to 40%.",
  },
];

// ServiceCard internals are UNCHANGED — card body copy stays left-aligned
// for readability, as in the original design.
function ServiceCard({ s, i }: { s: (typeof SERVICES)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const [open, setOpen] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
      animate={inView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      className="group relative flex flex-col overflow-hidden cursor-pointer"
      style={{ background: WH, border: "1px solid rgba(0,0,0,0.08)" }}
      onClick={() => setOpen(o => !o)}
    >
      <motion.div className="absolute top-0 left-0 bottom-0 w-[3px]"
        style={{ background: G, transformOrigin: "top", scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.1 }}
      />
      <div className="p-5 sm:p-8 pl-8 sm:pl-10 flex-1">
        <div className="flex items-start justify-between mb-5 sm:mb-6">
          <span className="text-[11px] font-black tracking-[0.2em]" style={{ color: INK3 }}>{s.n}</span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.28 }}
            className="w-7 h-7 flex items-center justify-center border shrink-0"
            style={{ borderColor: "rgba(0,144,63,0.3)", color: G }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
        <h3 className="font-bold leading-tight tracking-tight mb-3 sm:mb-4"
          style={{ fontFamily: DISPLAY_FONT, fontWeight: 800, fontSize: "clamp(1.25rem,3vw,1.8rem)", color: INK }}>
          {s.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 sm:mb-6" style={{ color: INK2 }}>{s.desc}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {s.tags.map((t: string) => (
            <span key={t} className="px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase border"
              style={{ borderColor: "rgba(0,144,63,0.2)", color: G, background: "rgba(0,144,63,0.05)" }}>{t}</span>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="detail"
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}>
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <p className="text-sm leading-relaxed" style={{ color: INK2 }}>{s.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="px-5 sm:px-8 pl-8 sm:pl-10 py-3 sm:py-4 border-t flex items-center justify-between"
        style={{ borderColor: "rgba(0,0,0,0.07)", background: BG2 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: INK3 }}>
          Plastifusion
        </span>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: G }}>
          {open ? "Close ↑" : "Learn more ↓"}
        </span>
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <section style={{ background: BG }} className="py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <FU><Eyebrow label="Our Services" /></FU>
        {/* MOBILE-ALIGNMENT FIX: items-start -> items-center below lg so the
            heading block and the description shrink-wrap and center as
            units; text-center -> lg:text-left cascades to both headings
            and the paragraph. lg layout/alignment unchanged. */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10 mb-12 md:mb-16 text-center lg:text-left">
          <div>
            <CR>
              <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: INK }}>
                Four services.
              </h2>
            </CR>
            <CR delay={0.09}>
              <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, WebkitTextStroke: `2px ${G}`, color: "transparent" }}>
                One roof.
              </h2>
            </CR>
          </div>
          <FU delay={0.18} className="max-w-sm">
            <p className="text-sm leading-relaxed" style={{ color: INK2 }}>
              Tap any card to expand technical details. Every service is delivered
              from our Coimbatore facility with ISO 9001:2015 quality controls at every stage.
            </p>
          </FU>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── MACHINES ─────────────────────────────────────────────────────────────────
function Machines() {
  const machines = [
    {
      model: "UN160SKIII", brand: "YIZUMI", force: "160T / 1600kN", qty: 1,
      shotVol: "370.9 cm³", shotWt: "341.3 g", screwD: "48 mm",
      injPress: "162.9 MPa", injRate: "169 g/s", clampStroke: "410 mm",
      platen: "685 × 665 mm", tiebar: "460 × 440 mm", moldThk: "160–460 mm",
      motor: "25.2 kW", dryTime: "2.1 s",
    },
    {
      model: "UN120SKIII", brand: "YIZUMI", force: "120T / 1200kN", qty: 2,
      shotVol: "246.9 cm³", shotWt: "227.1 g", screwD: "43 mm",
      injPress: "170.4 MPa", injRate: "135.5 g/s", clampStroke: "360 mm",
      platen: "610 × 570 mm", tiebar: "415 × 375 mm", moldThk: "145–400 mm",
      motor: "21.4 kW", dryTime: "1.9 s",
    },
  ];

  return (
    <section style={{ background: BG2 }} className="py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <FU><Eyebrow label="Machine Fleet" /></FU>
        {/* MOBILE-ALIGNMENT FIX: same pattern as Services header. */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10 mb-12 md:mb-16 text-center lg:text-left">
          <CR>
            <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: INK }}>
              3 Yizumi<br /><span style={{ color: G }}>machines.</span>
            </h2>
          </CR>
          <FU delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed" style={{ color: INK2 }}>
              One UN160SKIII at 160 tonnes and two UN120SKIII at 120 tonnes — horizontal
              injection moulding machines with servo-hydraulic drive for energy efficiency.
            </p>
          </FU>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {machines.map((m, i) => (
            <FU key={i} delay={i * 0.12}>
              <div className="relative overflow-hidden" style={{ background: WH, border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6 border-b" style={{ borderColor: "rgba(0,0,0,0.07)", background: BG3 }}>
                  <div>
                    <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: G }}>{m.brand}</p>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: INK }}>{m.model}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: G }}>{m.force.split("/")[0].trim()}</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: INK3 }}>
                      Qty: {m.qty}
                    </div>
                  </div>
                </div>
                {/* 2-col spec grid — give each cell proper padding on mobile */}
                <div className="grid grid-cols-2 gap-px p-px" style={{ background: "rgba(0,0,0,0.06)" }}>
                  {[
                    ["Shot Volume",   m.shotVol],
                    ["Shot Weight",   m.shotWt],
                    ["Screw Dia.",    m.screwD],
                    ["Inj. Pressure", m.injPress],
                    ["Inj. Rate",     m.injRate],
                    ["Clamp Stroke",  m.clampStroke],
                    ["Platen (W×H)",  m.platen],
                    ["Tie Bar",       m.tiebar],
                    ["Mould Thick.",  m.moldThk],
                    ["Motor Power",   m.motor],
                    ["Dry Cycle",     m.dryTime],
                  ].map(([label, val]) => (
                    <div key={label} className="flex flex-col gap-0.5 sm:gap-1 px-3 sm:px-5 py-3 sm:py-4" style={{ background: WH }}>
                      <span style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: INK3, fontWeight: 600 }}>{label}</span>
                      <span className="font-bold text-xs sm:text-sm" style={{ color: INK }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FU>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
const MATS = [
  { code: "ABS",   name: "Acrylonitrile Butadiene Styrene", density: "0.99 g/cm³", use: "Enclosures, housings, consumer products" },
  { code: "PP",    name: "Polypropylene",                    density: "0.80 g/cm³", use: "Automotive clips, containers, medical" },
  { code: "PC",    name: "Polycarbonate",                    density: "1.05 g/cm³", use: "Optical, electrical, safety-critical" },
  { code: "NYLON", name: "Polyamide 6/66",                   density: "0.98 g/cm³", use: "Gears, bearings, structural connectors" },
  { code: "POM",   name: "Polyoxymethylene (Delrin)",         density: "1.08 g/cm³", use: "Precision gears, rollers, bushings" },
  { code: "HDPE",  name: "High Density Polyethylene",         density: "0.80 g/cm³", use: "Industrial, chemical-resistant parts" },
  { code: "LDPE",  name: "Low Density Polyethylene",          density: "0.80 g/cm³", use: "Flexible packaging, seals" },
  { code: "TPE",   name: "Thermoplastic Elastomer",           density: "—",          use: "Soft-touch grips, seals, overmoulds" },
  { code: "GF",    name: "Glass-Filled Grades",               density: "varies",     use: "High-strength structural, dimensionally stable" },
  { code: "FR",    name: "Flame-Retardant Grades",            density: "varies",     use: "Electrical, UL94 compliant components" },
];

function Materials() {
  return (
    <section style={{ background: BG }} className="py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <FU><Eyebrow label="Material Expertise" /></FU>
        {/* MOBILE-ALIGNMENT FIX: same pattern as Services/Machines headers. */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10 mb-10 md:mb-14 text-center lg:text-left">
          <CR>
            <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: INK }}>
              10 materials.<br /><span style={{ color: G }}>Endless parts.</span>
            </h2>
          </CR>
          <FU delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed" style={{ color: INK2 }}>
              We process commodity and engineering-grade thermoplastics including glass-filled and flame-retardant compounds.
              Material selection guidance is included with every DFM review.
            </p>
          </FU>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.07)" }}>
          {MATS.map((m, i) => (
            <FU key={i} delay={i * 0.04}>
              <motion.div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-6" style={{ background: WH }}
                whileHover={{ background: BG2 }} transition={{ duration: 0.18 }}>
                <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center font-black text-[10px] sm:text-xs tracking-wider"
                  style={{ background: "rgba(0,144,63,0.07)", border: `1px solid rgba(0,144,63,0.2)`, color: G }}>
                  {m.code}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold mb-0.5 leading-snug" style={{ color: INK }}>{m.name}</p>
                  <p className="text-[11px] sm:text-xs mb-1 sm:mb-1.5" style={{ color: INK3 }}>ρ {m.density}</p>
                  <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: INK2 }}>{m.use}</p>
                </div>
              </motion.div>
            </FU>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { name: "Automotive",    icon: "🚗", parts: "Clips · Connectors · Dashboard Trims · Housings · Brackets" },
  { name: "Electronics",   icon: "⚡", parts: "Enclosures · Switches · Cable Glands · Connector Housings" },
  { name: "Consumer Goods",icon: "🏠", parts: "Kitchenware · Containers · Appliance Parts · Toys" },
  { name: "Medical",       icon: "⚕",  parts: "Non-implantable Components · Casings · Disposables" },
  { name: "Industrial",    icon: "⚙",  parts: "Gears · Rollers · Custom Fixtures · Structural Parts" },
];

// IndustryRow is UNCHANGED — left-aligned icon+text list rows stay as-is.
function IndustryRow({ ind, i }: { ind: (typeof INDUSTRIES)[0]; i: number }) {
  const iRef = useRef(null);
  const iInView = useInView(iRef, { once: true });
  return (
    <div ref={iRef} className="relative">
      <motion.div className="absolute bottom-0 left-0 h-px"
        style={{ background: `rgba(0,144,63,0.2)` }}
        initial={{ width: "0%" }}
        animate={iInView ? { width: "100%" } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      />
      <motion.div
        initial={{ opacity: 0, x: -24 }} animate={iInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
        className="group flex items-center gap-4 sm:gap-6 py-5 sm:py-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 text-lg sm:text-xl"
          style={{ background: "rgba(0,144,63,0.07)", border: `1px solid rgba(0,144,63,0.18)` }}>
          {ind.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-base sm:text-lg tracking-tight mb-0.5" style={{ color: INK }}>{ind.name}</p>
          <p className="text-xs leading-snug" style={{ color: INK2 }}>{ind.parts}</p>
        </div>
        <motion.div className="opacity-0 group-hover:opacity-100 shrink-0" transition={{ duration: 0.15 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14L14 2M14 2H6M14 2V10" stroke={G} strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Industries() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} style={{ background: BG3 }} className="py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FU><Eyebrow label="Industries We Serve" /></FU>

        {/* Ghost watermark — decorative parallax marquee, left as-is */}
        <div className="relative overflow-hidden mb-10 md:mb-12" style={{ height: "clamp(2.5rem,7vw,4.5rem)" }}>
          <motion.div style={{ x: x1 }} className="absolute whitespace-nowrap select-none pointer-events-none">
            <span style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "clamp(2rem,7vw,4.5rem)",
              color: INK,
              opacity: 0.04,
              letterSpacing: "0.02em",
            }}>
              AUTOMOTIVE · ELECTRONICS · CONSUMER · MEDICAL · INDUSTRIAL ·&nbsp;
            </span>
          </motion.div>
        </div>

        {/* MOBILE-ALIGNMENT FIX: center this standalone display heading on
            mobile/tablet, revert to left at lg (original). */}
        <CR>
          <h2 className="text-center lg:text-left" style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: INK, marginBottom: "3rem" }}>
            Five sectors.<br />
            <span style={{ WebkitTextStroke: `2px ${G}`, color: "transparent" }}>Countless parts.</span>
          </h2>
        </CR>
        <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
          {INDUSTRIES.map((ind, i) => <IndustryRow key={i} ind={ind} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── QUALITY ──────────────────────────────────────────────────────────────────
function Quality() {
  const counterRef = useRef(null);
  const counterInView = useInView(counterRef, { once: true });
  const count = useCountUp("20", 1.8, counterInView);

  const pts = [
    { h: "ISO 9001:2015 Certified",  b: "Full quality management system with 100% part inspection at final stage. Every batch shipped with dimensional report." },
    { h: "DFM-First Engineering",    b: "Every project begins with a Design for Manufacturability review. We catch costly errors before a single tonne of pressure is applied." },
    { h: "Fast Turnaround",          b: "8-12 weeks for new moulds. 48 hours for repeat orders. Our lean floor scheduling keeps commitments, not excuses." },
    { h: "Cost-Effective Pricing",   b: "DFM-driven design reduces material waste. Competitive tooling and per-part pricing from prototype through mass production." },
    { h: "End-to-End Support",       b: "Material selection → mould design → moulding → secondary ops → QC → delivery. One supplier, full accountability." },
  ];

  return (
    <section style={{ background: BG2 }} className="py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <FU><Eyebrow label="Why Plastifusion" /></FU>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* MOBILE-ALIGNMENT FIX: center the heading/description/counter
              block below lg; text-center cascades to the headings and the
              counter's number+label. The paragraph additionally gets
              mx-auto so its max-w-md box is centered (grid items don't
              shrink-wrap the way flex items with items-center do).
              Right-hand quality-point cards are untouched — still left. */}
          <div className="text-center lg:text-left">
            <CR>
              <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: INK }}>
                Quality
              </h2>
            </CR>
            <CR delay={0.08}>
              <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(2.6rem,6vw,5.5rem)", lineHeight: 0.9, color: G }}>
                first.
              </h2>
            </CR>
            <FU delay={0.2}>
              <p className="mt-6 sm:mt-8 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: INK2 }}>
                ISO 9001:2015 isn't a frame on the wall. It's the process every operator follows on every shift — from material receipt to final delivery.
              </p>
            </FU>
            <FU delay={0.32}>
              <div ref={counterRef} className="mt-8 sm:mt-10 flex items-center gap-5 p-4 sm:p-5 border-l-2"
                style={{ borderColor: G, background: WH }}>
                <div>
                  <div className="font-black tracking-tight" style={{ fontSize: "clamp(2.4rem,6vw,3rem)", color: G, lineHeight: 1 }}>
                    {count}+
                  </div>
                  <div className="text-[10px] tracking-[0.18em] uppercase font-bold mt-1" style={{ color: INK3 }}>
                    Years of injection moulding experience
                  </div>
                </div>
              </div>
            </FU>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {pts.map((p, i) => (
              <FU key={i} delay={i * 0.09}>
                <motion.div className="p-4 sm:p-5 border-l-2 transition-colors duration-200"
                  style={{ borderColor: G, background: WH, borderRadius: "0 4px 4px 0" }}
                  whileHover={{ paddingLeft: 28, background: BG }}
                  transition={{ duration: 0.2 }}>
                  <p className="text-sm font-bold mb-1 sm:mb-1.5" style={{ color: INK }}>{p.h}</p>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: INK2 }}>{p.b}</p>
                </motion.div>
              </FU>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
// CTA was already fully centered (text-center wrapper + mx-auto paragraph),
// so it is UNCHANGED. Note: the Eyebrow fix above also makes this section's
// eyebrow center on mobile, now consistent with the centered headline below it.
function CTA() {
  return (
    <section className="relative py-28 md:py-40 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: INK }}>
      <motion.div className="absolute pointer-events-none" style={{
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,176,80,0.12) 0%,transparent 65%)",
        left: "50%", top: "-30%", x: "-50%"
      }}
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(0,176,80,0.12) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.4,
      }} />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <FU><Eyebrow label="Get Started" dark /></FU>
        <CR>
          <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.88, color: "#fff" }}>
            Let's build
          </h2>
        </CR>
        <CR delay={0.08}>
          <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(3rem,10vw,8rem)", lineHeight: 0.88, color: G }}>
            it right.
          </h2>
        </CR>
        <FU delay={0.3}>
          <p className="mt-6 sm:mt-8 text-sm sm:text-base leading-relaxed max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Tell us about your component, tolerances, and volumes.
            Our engineers will respond with a DFM assessment within 48 hours.
          </p>
        </FU>
        <FU delay={0.45} className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 sm:px-10 py-4 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300"
            style={{ background: G, color: "#fff" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#007533"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = G}>
            Request a Quote
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <a href="tel:+919994771121"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 sm:px-10 py-4 text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300"
            style={{ background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}>
            Call Us
          </a>
        </FU>
        <FU delay={0.6}>
          <p className="mt-6 sm:mt-8 text-[10px] sm:text-xs px-4" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
            S.F.No.639/1, Site No.60,61 · Comsia Industrial Estate · Vellamadai Village · Coimbatore – 641110
          </p>
        </FU>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <main style={{ background: BG }}>
      <Hero />
      <CapBand />
      <Services />
      <Machines />
      <Materials />
      <Industries />
      <Quality />
      <CTA />
    </main>
  );
}
