"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Hero } from "./Hero";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const G = "#00b050";
const GD = "#006B2D";
const OFF = "#FAFAF8";
const D = "#0a0a0a";
const D2 = "#111111";
const D3 = "#161616";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// ─── CLIP REVEAL ──────────────────────────────────────────────────────────────
function CR({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── FADE UP ──────────────────────────────────────────────────────────────────
function FU({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
function Eyebrow({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-10 h-px" style={{ background: G }} />
      <span
        className="text-[11px] tracking-[0.28em] uppercase font-bold"
        style={{ color: G }}
      >
        {label}
      </span>
      <div
        className="w-10 h-px"
        style={{ background: onDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
      />
    </div>
  );
}

// ─── MOULD CROSS-SECTION SVG (animated) ──────────────────────────────────────
function MouldCrossSection() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      suppressHydrationWarning
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={G} strokeWidth="0.3" opacity="0.12" />
        </pattern>
        <mask id="circleMask">
          <circle cx="160" cy="160" r="130" fill="white" />
        </mask>
      </defs>
      <circle cx="160" cy="160" r="130" fill="#f2f2f0" />
      <rect x="30" y="30" width="260" height="260" fill="url(#grid)" mask="url(#circleMask)" />

      {/* Outer circle */}
      <circle cx="160" cy="160" r="130" stroke={G} strokeWidth="0.75" opacity="0.3" />

      {/* Mould halves - top */}
      <motion.g
        initial={{ y: -18 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="72" y="80" width="176" height="62" rx="2" fill="#d8d8d5" stroke={G} strokeWidth="1.2" opacity="0.95" />
        <rect x="154" y="80" width="12" height="62" fill={G} opacity="0.15" />
        {[100, 130, 190, 220].map((x, i) => (
          <rect key={i} x={x} y="96" width="4" height="20" rx="1" fill={G} opacity="0.5" />
        ))}
        <line x1="80" y1="106" x2="240" y2="106" stroke={G} strokeWidth="0.4" opacity="0.2" />
        <line x1="80" y1="120" x2="240" y2="120" stroke={G} strokeWidth="0.4" opacity="0.2" />
      </motion.g>

      {/* Mould halves - bottom */}
      <motion.g
        initial={{ y: 18 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="72" y="178" width="176" height="62" rx="2" fill="#d8d8d5" stroke={G} strokeWidth="1.2" opacity="0.95" />
        <rect x="154" y="178" width="12" height="62" fill={G} opacity="0.15" />
        {[100, 130, 190, 220].map((x, i) => (
          <rect key={i} x={x} y="204" width="4" height="20" rx="1" fill={G} opacity="0.5" />
        ))}
        <line x1="80" y1="194" x2="240" y2="194" stroke={G} strokeWidth="0.4" opacity="0.2" />
        <line x1="80" y1="208" x2="240" y2="208" stroke={G} strokeWidth="0.4" opacity="0.2" />
      </motion.g>

      {/* Part cavity */}
      <motion.rect
        x="110" y="142" width="100" height="36" rx="3"
        fill={G}
        opacity="0"
        animate={{ opacity: [0, 0.18, 0, 0.18, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Parting line */}
      <motion.line
        x1="72" y1="160" x2="248" y2="160"
        stroke={G} strokeWidth="1" strokeDasharray="4 3"
        opacity="0.5"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      {/* Crosshair center */}
      <line x1="155" y1="148" x2="165" y2="148" stroke={G} strokeWidth="0.8" opacity="0.7" />
      <line x1="160" y1="143" x2="160" y2="177" stroke={G} strokeWidth="0.8" opacity="0.7" />

      {/* Tolerance ring */}
      <motion.circle
        cx="160" cy="160" r="28"
        stroke={G} strokeWidth="0.7" strokeDasharray="2 4"
        opacity="0.3"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: "160px 160px" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer ring tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const r1 = 124, r2 = i % 4 === 0 ? 112 : 118;
        return (
          <line
            key={i}
            x1={Math.round((160 + r1 * Math.cos(angle)) * 100) / 100}
            y1={Math.round((160 + r1 * Math.sin(angle)) * 100) / 100}
            x2={Math.round((160 + r2 * Math.cos(angle)) * 100) / 100}
            y2={Math.round((160 + r2 * Math.sin(angle)) * 100) / 100}
            stroke={G}
            strokeWidth={i % 4 === 0 ? 1 : 0.5}
            opacity={i % 4 === 0 ? 0.5 : 0.2}
          />
        );
      })}

      {/* Corner brackets */}
      {[
        [60, 60], [250, 60], [60, 250], [250, 250]
      ].map(([cx, cy], i) => {
        const sx = i % 2 === 0 ? 1 : -1;
        const sy = i < 2 ? 1 : -1;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx + sx * 12} y2={cy} stroke={G} strokeWidth="1" opacity="0.35" />
            <line x1={cx} y1={cy} x2={cx} y2={cy + sy * 12} stroke={G} strokeWidth="1" opacity="0.35" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── SCANNING LINE EFFECT ─────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{ background: `linear-gradient(90deg, transparent 0%, ${G} 40%, ${G} 60%, transparent 100%)`, opacity: 0.35 }}
      animate={{ top: ["5%", "95%", "5%"] }}
      transition={{ duration: 5, ease: "linear", repeat: Infinity }}
    />
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
const TICKS = [
  "Innovation in Every Mold",
  "ISO 9001:2015 Certified",
  "±0.5mm Precision",
  "120T – 160T Capacity",
  "48hr Repeat Delivery",
  "Coimbatore, India",
  "Est. 2026",
];

function Ticker({ dark = true, reverse = false }) {
  const doubled = [...TICKS, ...TICKS, ...TICKS];
  return (
    <div
      className="overflow-hidden py-[10px] border-y select-none"
      style={{
        background: dark ? D2 : OFF,
        borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
      }}
    >
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: reverse ? [-1200,0] : [0, -1200] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-5 text-[11px] tracking-[0.22em] uppercase font-semibold shrink-0"
            style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}
          >
            <span style={{ color: G, fontSize: 8 }}>◆</span>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MANIFESTO ────────────────────────────────────────────────────────────────
function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const words = "We started Plastifusion with one conviction — that precision is not a feature. It is the only standard. Every mould we cut, every part we release, every tolerance we hold is proof of that.".split(" ");

  return (
    <section ref={ref} style={{ background: D }} className="py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FU><Eyebrow label="Our Manifesto" onDark={true} /></FU>
        <div className="relative mb-14 overflow-hidden">
          <motion.div style={{ x }} className="whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
            <span className="text-[12vw] font-black uppercase tracking-tight text-white">
              PRECISION &nbsp; QUALITY &nbsp; PRECISION &nbsp; QUALITY
            </span>
          </motion.div>
        </div>
        <ManifestoText words={words} />
      </div>
    </section>
  );
}

function ManifestoText({ words }: { words: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <p
      ref={ref}
      className="text-[clamp(1.4rem,3.2vw,2.4rem)] font-semibold leading-[1.35] tracking-[-0.01em]"
      style={{ color: "rgba(255,255,255,0.2)" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ color: "rgba(255,255,255,0.15)" }}
          animate={inView ? { color: i < words.length * 0.4 ? "#ffffff" : i < words.length * 0.75 ? "rgba(255,255,255,0.85)" : G } : {}}
          transition={{ delay: 0.04 * i, duration: 0.5 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </p>
  );
}

// ─── DIRECTOR CARD ────────────────────────────────────────────────────────────
interface DirectorCardProps {
  name: string;
  degree: string;
  role: string;
  tagline: string;
  bio: string;
  phone1: string;
  phone2: string;
  email: string;
  number: number;
  image: string;
}

function DirectorCard({ name, degree, role, tagline, bio, number, phone1, phone2, email, image }: DirectorCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: number * 0.2 }}
      className="group relative flex flex-col overflow-hidden cursor-pointer"
      style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        {/* Director Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
  <Image
    src={image}
    alt={name}
    fill
    className="object-cover"
  />
</div>

      <div
  className="absolute inset-0"
  style={{
    background:
      number === 0
        ? "linear-gradient(160deg, rgba(13,31,16,0.35) 0%, rgba(7,21,8,0.35) 50%, rgba(3,10,4,0.35) 100%)"
        : "linear-gradient(160deg, rgba(15,26,13,0.35) 0%, rgba(8,18,7,0.35) 50%, rgba(4,10,3,0.35) 100%)",
  }}
/>
       
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(0,176,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,176,80,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,176,80,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "65%", background: "linear-gradient(to top, #141414 0%, transparent 100%)" }} />
        <div className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center border text-xs font-black" style={{ borderColor: "rgba(0,176,80,0.3)", color: G }}>
          {String(number + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <p className="text-[11px] tracking-[0.22em] uppercase font-bold mb-1" style={{ color: G }}>{role}</p>
          <h3 className="text-2xl font-black tracking-tight text-white leading-tight">
            {name}
            {degree && <span className="text-sm font-normal ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>{degree}</span>}
          </h3>
        </div>
      </div>
      <div className="p-7 flex flex-col gap-5 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-5 h-px mt-3 shrink-0" style={{ background: G }} />
          <p className="text-sm font-semibold italic leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>"{tagline}"</p>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="bio"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{bio}</p>
              <div className="mt-5 space-y-2">
                {phone1 && <a href={`tel:${phone1.replace(/\s/g, "")}`} className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }} onClick={e => e.stopPropagation()}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10.5 8.5C10.5 8.7 10.46 8.9 10.37 9.1C10.28 9.3 10.15 9.49 9.98 9.66C9.68 9.97 9.36 10.12 9.01 10.12C8.7 10.12 8.36 10.04 8 9.88C7.64 9.72 7.28 9.51 6.93 9.25C6.57 8.98 6.23 8.69 5.91 8.37C5.59 8.05 5.3 7.71 5.04 7.35C4.79 7 4.58 6.64 4.42 6.28C4.27 5.92 4.19 5.58 4.19 5.26C4.19 4.92 4.26 4.6 4.39 4.3C4.52 3.99 4.72 3.71 4.99 3.47C5.32 3.15 5.68 3 6.06 3C6.2 3 6.34 3.03 6.47 3.09C6.6 3.15 6.72 3.24 6.81 3.37L7.94 4.93C8.03 5.05 8.1 5.17 8.14 5.28C8.19 5.39 8.22 5.5 8.22 5.6C8.22 5.73 8.18 5.86 8.1 5.98C8.03 6.1 7.93 6.23 7.8 6.36L7.39 6.78C7.33 6.84 7.3 6.91 7.3 7C7.3 7.05 7.31 7.09 7.33 7.13C7.35 7.17 7.37 7.21 7.39 7.25C7.48 7.4 7.63 7.59 7.83 7.81C8.04 8.03 8.26 8.25 8.5 8.47C8.73 8.68 8.95 8.87 9.17 9.02C9.39 9.17 9.58 9.27 9.76 9.31C9.8 9.32 9.84 9.32 9.88 9.32C9.97 9.32 10.04 9.29 10.1 9.23L10.51 8.81C10.64 8.68 10.77 8.58 10.9 8.51C11.03 8.43 11.15 8.39 11.29 8.39C11.39 8.39 11.5 8.41 11.62 8.46C11.74 8.51 11.86 8.58 11.99 8.67L13.57 9.82C13.7 9.91 13.79 10.02 13.84 10.15C13.89 10.28 13.91 10.42 13.91 10.57Z" stroke={G} strokeWidth="0.8" /></svg>{phone1}</a>}
                {phone2 && <a href={`tel:${phone2.replace(/\s/g, "")}`} className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }} onClick={e => e.stopPropagation()}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="0.5" width="8" height="11" rx="1.5" stroke={G} strokeWidth="0.8" /><circle cx="6" cy="9.5" r="0.8" fill={G} /></svg>{phone2}</a>}
                {email && <a href={`mailto:${email}`} className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }} onClick={e => e.stopPropagation()}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2.5" width="10" height="7" rx="1" stroke={G} strokeWidth="0.8" /><path d="M1 4L6 7L11 4" stroke={G} strokeWidth="0.8" /></svg>{email}</a>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-auto pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Plastifusion Plastics</span>
          <motion.div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: G }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
            {expanded ? "Close" : "View profile"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={expanded ? "M1 9L9 1M1 1L9 9" : "M1 9L9 1M9 1H4M9 1V6"} stroke="currentColor" strokeWidth="1.2" /></svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function Timeline() {
  const milestones = [
    { year: "2026", label: "Founded", desc: "Plastifusion Plastics Pvt. Ltd. incorporated in Coimbatore with a vision of precision-first manufacturing." },
    { year: "2026", label: "ISO Certified", desc: "Achieved ISO 9001:2015 certification with 100% inspection protocol from day one." },
    { year: "2026", label: "First Production Run", desc: "Delivered first batch of precision components to automotive and electronics clients within the founding year." },
    { year: "Now", label: "Scaling", desc: "Operating 120T–160T machines with capacity for prototype to mass production across 5 industries." },
  ];
  return (
    <div className="relative pl-12 md:pl-20">
      <div className="absolute left-3 md:left-6 top-0 bottom-0 w-px" style={{ background: "rgba(0,176,80,0.2)" }} />
      <div className="space-y-12">
        {milestones.map((m, i) => (
          <FU key={i} delay={i * 0.1}>
            <div className="relative">
              <div className="absolute -left-[calc(3rem-0.75rem)] md:-left-[calc(5rem-0.75rem)] top-1 w-3 h-3 rounded-full border-2 flex items-center justify-center" style={{ borderColor: G, background: D }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
              </div>
              <div className="flex items-start gap-6">
                <span className="text-[11px] tracking-[0.15em] uppercase font-bold shrink-0 mt-0.5" style={{ color: G }}>{m.year}</span>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{m.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{m.desc}</p>
                </div>
              </div>
            </div>
          </FU>
        ))}
      </div>
    </div>
  );
}

// ─── CAPABILITIES GRID ────────────────────────────────────────────────────────
const CAPS = [
  { label: "Tonnage", val: "120T – 160T", sub: "Injection moulding machines" },
  { label: "Tolerance", val: "±0.5mm", sub: "Critical dimensions" },
  { label: "Lead Time", val: "8-12 wks", sub: "New mould production" },
  { label: "Repeat", val: "48 hrs", sub: "Repeat order turnaround" },
  { label: "Inspection", val: "100%", sub: "Every part, every time" },
  { label: "Volumes", val: "1 → ∞", sub: "Prototype to mass production" },
];

function CapGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
      {CAPS.map((c, i) => (
        <FU key={i} delay={i * 0.06}>
          <motion.div className="p-8 flex flex-col gap-1" style={{ background: D3 }} whileHover={{ background: "#1a1a1a" }} transition={{ duration: 0.2 }}>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</span>
            <span className="text-3xl font-black tracking-tight" style={{ color: G, fontFamily: "'DM Sans', sans-serif" }}>{c.val}</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.sub}</span>
          </motion.div>
        </FU>
      ))}
    </div>
  );
}

// ─── INDUSTRIES ───────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { name: "Automotive", parts: "Clips · Connectors · Dashboards · Housings", icon: "A" },
  { name: "Electronics", parts: "Enclosures · Switches · Cable Glands", icon: "E" },
  { name: "Consumer Goods", parts: "Kitchenware · Containers · Appliance Parts", icon: "C" },
  { name: "Medical", parts: "Non-implantable Components · Casings · Disposables", icon: "H" },
  { name: "Industrial", parts: "Gears · Rollers · Custom Fixtures", icon: "I" },
];

function IndustryRow({ name, parts, icon, i }: { name: string; parts: string; icon: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
      className="group flex items-center gap-6 py-7 border-b cursor-default"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      <div className="w-10 h-10 flex items-center justify-center shrink-0 text-xs font-black" style={{ background: "rgba(0,107,45,0.1)", color: GD, border: `1px solid rgba(0,107,45,0.2)` }}>{icon}</div>
      <div className="flex-1">
        <p className="text-base font-bold mb-0.5" style={{ color: "#0a0a0a" }}>{name}</p>
        <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>{parts}</p>
      </div>
      <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke={G} strokeWidth="1.5" /></svg>
    </motion.div>
  );
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
const MATS = ["ABS", "PP", "PC", "Nylon", "POM", "HDPE", "LDPE", "TPE", "Glass-filled", "Flame-retardant"];

function Materials() {
  return (
    <div className="flex flex-wrap gap-3">
      {MATS.map((m, i) => (
        <FU key={i} delay={i * 0.04}>
          <div className="px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase border transition-colors duration-200 hover:border-green-600" style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>{m}</div>
        </FU>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const directors = [
    { name: "T. Rajeshwara Kumar", degree: "M.B.A", role: "Director", tagline: "Precision is not a target — it is our floor.", bio: "Rajeshwara Kumar co-founded Plastifusion with a vision for precision-first plastic manufacturing in Coimbatore. His MBA background combined with deep knowledge of injection moulding economics and client operations drives the company's strategic direction and client relationships.", phone1: "+91 94882 02023", phone2: "+91 63817 33925", email: "plastifusion2026@gmail.com", number: 0, image: "/Rajeshawara.jpeg"},
    { name: "Yokesh R", degree: "", role: "Director", tagline: "Quality in the mould means zero problems at delivery.", bio: "Yokesh R brings rigorous operational and technical discipline to Plastifusion's day-to-day manufacturing. Overseeing the toolroom, production floor, and quality control processes, he ensures every component leaving the facility meets the exact specification it was designed to.", phone1: "+91 99947 71121", phone2: "+91 94437 33121", email: "yokesh@plastifusionplastics.com", number: 1, image: "/Yokesh R.jpeg"},
  ];

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: D }} className="min-h-screen">
      <Hero />
      <Ticker />
      <Ticker reverse dark={false} />
      <Manifesto />

      {/* Directors Section */}
      <section style={{ background: D2 }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <FU><Eyebrow label="Leadership" onDark={true} /></FU>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <div>
              <CR><h2 className="text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.85] tracking-tight uppercase text-white">Two directors.</h2></CR>
              <CR delay={0.08}><h2 className="text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.85] tracking-tight uppercase" style={{ WebkitTextStroke: `2px ${G}`, color: "transparent" }}>One standard.</h2></CR>
            </div>
            <FU delay={0.2}><p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Tap any card to see the full profile, contact details, and direct lines.</p></FU>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {directors.map((d, i) => <DirectorCard key={i} {...d} />)}
          </div>
        </div>
      </section>

      {/* Timeline + Why Us */}
      <section style={{ background: D }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <FU><Eyebrow label="Our Journey" onDark={true} /></FU>
            <CR><h2 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-black leading-[0.88] tracking-tight uppercase text-white mb-12">From vision<br /><span style={{ color: G }}>to production.</span></h2></CR>
            <Timeline />
          </div>
          <div className="lg:pt-24">
            <FU><Eyebrow label="Why Plastifusion" onDark={true} /></FU>
            <div className="space-y-6">
              {[
                { heading: "DFM-First Engineering", body: "Every project starts with Design for Manufacturability — we catch costly errors before a single tonne of pressure is applied." },
                { heading: "In-House Toolroom", body: "Our toolroom builds single-cavity, multi-cavity, and family moulds in hardened steel, designed for millions of production cycles." },
                { heading: "End-to-End Capability", body: "From material selection and mould design through insert moulding, overmoulding, and assembly — all under one roof." },
                { heading: "ISO-Backed Quality", body: "ISO 9001:2015 certification isn't a frame on the wall — it is the process every operator follows, every shift." },
              ].map((item, i) => (
                <FU key={i} delay={i * 0.1}>
                  <div className="p-6 border-l-2" style={{ borderColor: G, background: "#111", borderRadius: "0 4px 4px 0" }}>
                    <p className="text-sm font-bold text-white mb-2">{item.heading}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.body}</p>
                  </div>
                </FU>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ background: D3 }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <FU><Eyebrow label="Capabilities" onDark={true} /></FU>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
            <div>
              <CR><h2 className="text-[clamp(2.2rem,4.5vw,5rem)] font-black leading-[0.88] tracking-tight uppercase text-white">Engineered</h2></CR>
              <CR delay={0.08}><h2 className="text-[clamp(2.2rem,4.5vw,5rem)] font-black leading-[0.88] tracking-tight uppercase" style={{ color: G }}>for every spec.</h2></CR>
            </div>
            <FU delay={0.15} className="max-w-xs"><p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Our infrastructure is built for both precision and pace — from one-off prototypes to continuous mass production volumes.</p></FU>
          </div>
          <CapGrid />
          <div className="mt-20">
            <FU><p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>Material Grade Expertise</p></FU>
            <Materials />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ background: OFF }} className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <FU><Eyebrow label="Industries We Serve" /></FU>
          <CR><h2 className="text-[clamp(2.2rem,4.5vw,5rem)] font-black leading-[0.88] tracking-tight uppercase mb-14" style={{ color: "#0a0a0a" }}>Five sectors.<br /><span style={{ WebkitTextStroke: `2px ${GD}`, color: "transparent" }}>Countless parts.</span></h2></CR>
          <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            {INDUSTRIES.map((ind, i) => <IndustryRow key={i} {...ind} i={i} />)}
          </div>
        </div>
      </section>

      <Ticker />

      {/* CTA */}
      <section className="relative py-44 px-8 md:px-16 lg:px-24 overflow-hidden" style={{ background: D2 }}>
        <motion.div className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,176,80,0.08) 0%, transparent 70%)", right: "-10%", top: "-20%" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <FU><Eyebrow label="Next Steps" onDark={true} /></FU>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16">
            <div>
              <CR><h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.82] tracking-tight uppercase text-white">Let's build</h2></CR>
              <CR delay={0.08}><h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.82] tracking-tight uppercase" style={{ color: G }}>it right.</h2></CR>
              <FU delay={0.3}><p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Tell us about your component, your tolerances, your volumes. Our engineers will get back with a DFM assessment within 48 hours.</p></FU>
            </div>
            <FU delay={0.2} className="flex flex-col gap-4 shrink-0">
              <a href="/contact" className="inline-flex items-center gap-5 px-10 py-5 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300" style={{ background: G, color: "#fff", border: `1.5px solid ${G}` }} onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G; }} onMouseLeave={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = "#fff"; }}>
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" /></svg>
              </a>
              <a href="tel:+919994771121" className="inline-flex items-center gap-5 px-10 py-5 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300" style={{ background: "transparent", color: "rgba(255,255,255,0.45)", border: "1.5px solid rgba(255,255,255,0.1)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}>
                Call Us Now →
              </a>
              <p className="text-xs leading-relaxed mt-4 max-w-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                S.F.No.639/1, Site No.60,61 Comsia Industrial Estate,<br />
                Vellamadai Village, Coimbatore – 641110
              </p>
            </FU>
          </div>
        </div>
      </section>
    </main>
  );
}