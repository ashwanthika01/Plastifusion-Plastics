"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─── Palette ───────────────────────────────────────────── */
const G = "#006B2D";
const GL = "#00b050";

/* ─── Odometer Counter ──────────────────────────────────── */
function Odometer({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.8,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${prefix}${Math.floor(v)}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, value, suffix, prefix, motionVal]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ─── Precision Crosshair Cursor ────────────────────────── */
function CrosshairCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: sx, top: sy, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed z-[9999] hidden lg:block"
    >
      <div className="relative w-8 h-8">
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#006B2D]/60" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#006B2D]/60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-[#006B2D]" />
      </div>
    </motion.div>
  );
}

/* ─── Blueprint Grid ─────────────────────────────────────── */
function BlueprintGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Major grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="minor" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#006B2D" strokeWidth="0.4" />
          </pattern>
          <pattern id="major" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="url(#minor)" />
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#006B2D" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major)" />
      </svg>
      {/* Corner registration marks */}
      {[["top-8 left-8"], ["top-8 right-8"], ["bottom-8 left-8"], ["bottom-8 right-8"]].map(
        ([pos], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 border-[#006B2D]/30`}
            style={{
              borderTopWidth: i < 2 ? 1 : 0,
              borderBottomWidth: i >= 2 ? 1 : 0,
              borderLeftWidth: i % 2 === 0 ? 1 : 0,
              borderRightWidth: i % 2 === 1 ? 1 : 0,
            }}
          />
        )
      )}
    </div>
  );
}

/* ─── Spinning Dial ──────────────────────────────────────── */
function Dial({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <motion.circle
            cx="40" cy="40" r="35"
            fill="none" stroke={G} strokeWidth="4"
            strokeDasharray="219.9" strokeDashoffset="219.9"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 219.9 }}
            whileInView={{ strokeDashoffset: 219.9 * 0.22 }}
            transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "center", rotate: "-90deg" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-stone-900 tracking-tight">{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-stone-400 text-center max-w-[80px] leading-tight">{label}</span>
    </div>
  );
}

/* ─── Spec Tag ───────────────────────────────────────────── */
function SpecTag({ label }: { label: string }) {
  return (
    <motion.span
      whileHover={{ backgroundColor: G, color: "#fff", borderColor: G, scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 border border-stone-300 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase text-stone-500 cursor-default select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#006B2D] shrink-0" />
      {label}
    </motion.span>
  );
}

/* ─── Horizontal Cert Reel ───────────────────────────────── */
const certs = [
  { code: "ISO", full: "9001:2015", desc: "Quality Management Systems" },
  { code: "RoHS", full: "2011/65/EU", desc: "Hazardous Substances Directive" },
  { code: "REACH", full: "1907/2006", desc: "Chemical Safety Regulation" },
  { code: "±0.5", full: "mm", desc: "Critical Dimension Tolerance" },
  { code: "100%", full: "Inspection", desc: "Zero-Skip Audit Process" },
];

function CertReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    const card = trackRef.current?.children[i] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  return (
    <div className="relative">
      {/* Reel track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {certs.map((c, i) => (
          <motion.div
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ y: -6 }}
            animate={active === i
              ? { borderColor: G, backgroundColor: "#f0fdf4" }
              : { borderColor: "#e7e5e4", backgroundColor: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="snap-center shrink-0 w-[220px] rounded-2xl border-2 p-6 cursor-pointer relative overflow-hidden"
          >
            {/* Corner accent */}
            <motion.div
              animate={active === i ? { opacity: 1 } : { opacity: 0 }}
              className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl"
              style={{ background: `${G}15` }}
            />
            <p
              className="text-[2rem] font-black leading-none tracking-tight"
              style={{ color: active === i ? G : "#a8a29e" }}
            >
              {c.code}
            </p>
            <p className="text-sm font-bold text-stone-400 mt-1">{c.full}</p>
            <p className="text-[13px] text-stone-500 mt-3 leading-snug">{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Dot nav */}
      <div className="flex gap-2 mt-6 justify-center">
        {certs.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? 24 : 6,
              height: 6,
              backgroundColor: active === i ? G : "#d6d3d1",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Infrastructure Items ───────────────────────────────── */
const infraItems = [
  { label: "Injection Moulding Machines", spec: "120T–160T Press Force", fill: 88 },
  { label: "In-House Toolroom",           spec: "P20 & H13 Steel",       fill: 72 },
  { label: "Quality Inspection Systems",  spec: "CMM + Optical Gauging", fill: 95 },
  { label: "Prototype Development",       spec: "T1 Within 72 Hours",    fill: 80 },
];

function InfraBar({ item, delay }: { item: typeof infraItems[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-black text-stone-700 tracking-tight group-hover:text-[#006B2D] transition-colors duration-300">
          {item.label}
        </span>
        <span className="text-[11px] font-bold text-stone-400 tracking-wide">
          {item.spec}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${item.fill}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${G}, ${GL})` }}
        />
      </div>
      <p className="text-[11px] text-stone-300 mt-1 font-semibold tracking-widest uppercase">
        Utilisation capacity
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════ */
/* MAIN                                                      */
/* ════════════════════════════════════════════════════════ */
export default function InfrastructureAndCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ruleWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);
  const imgParallax = useTransform(scrollYProgress, [0.2, 0.7], ["-6%", "6%"]);

  return (
    <>
      <CrosshairCursor />

      <section
        ref={sectionRef}
        className="relative bg-[#F7F6F3] overflow-hidden"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "none" }}
      >
        <BlueprintGrid />

        {/* A — INFRASTRUCTURE */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 pt-0 pb-0">
          {/* Animated full-width rule */}
          <div className="overflow-hidden h-px mb-16">
            <motion.div style={{ width: ruleWidth }} className="h-full bg-[#006B2D]" />
          </div>

          {/* Chapter label — rotated, anchored left */}
          <div className="flex items-start gap-12 lg:gap-20">
            <div className="hidden lg:flex flex-col items-center gap-3 pt-2 shrink-0">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[9px] font-black tracking-[6px] uppercase text-[#006B2D]"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Infrastructure
              </motion.span>
              <div className="w-px flex-1 min-h-[120px] bg-gradient-to-b from-[#006B2D] to-transparent" />
            </div>

            <div className="flex-1 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* LEFT — image with overlaid dials */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative rounded-[28px] overflow-hidden aspect-[4/5] bg-stone-200 shadow-2xl shadow-stone-400/20"
                >
                  <motion.div style={{ y: imgParallax }} className="absolute inset-[-8%]">
                    <Image src="/pim.jpg" alt="Facility" fill className="object-cover object-center" />
                  </motion.div>
                  {/* dark film */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

                  {/* Blueprint overlay lines */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,107,45,0.12) 40px)",
                    }}
                  />

                  {/* Bottom data strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900/90 to-transparent">
                    <p className="text-[9px] font-black tracking-[4px] uppercase text-[#00b050] mb-3">
                      Facility Overview — Coimbatore
                    </p>
                    <div className="flex gap-6">
                      {[
                        { v: "20+", l: "Years" },
                        { v: "50K", l: "Parts/Mo" },
                        { v: "98%", l: "On-Time" },
                      ].map((s, i) => (
                        <div key={i}>
                          <p className="text-2xl font-black text-white leading-none">{s.v}</p>
                          <p className="text-[10px] tracking-[2px] uppercase text-stone-400 font-semibold mt-0.5">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top-right corner tag */}
                  <div className="absolute top-5 right-5 border border-white/20 rounded-xl px-3 py-2 backdrop-blur-md bg-white/5">
                    <p className="text-[9px] font-black tracking-[3px] uppercase text-white/70">REF. PFP-MFG-01</p>
                  </div>
                </motion.div>

                {/* Floating dials */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -right-6 top-1/3 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-stone-100 flex gap-4"
                >
                  <Dial label="Press Force" value="160T" />
                  <Dial label="Tolerance" value="±0.5" />
                </motion.div>
              </div>

              {/* RIGHT — bars */}
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <h2
                    className="text-[clamp(2.4rem,4.5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em] text-stone-900"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    Modern
                    <br />
                    <span style={{ color: G }}>Manufacturing</span>
                    <br />
                    Infrastructure.
                  </h2>
                  <p className="mt-6 text-[16px] leading-relaxed text-stone-500 max-w-sm">
                    Advanced machinery, in-house tooling and end-to-end inspection — every
                    stage of production under one roof in Coimbatore.
                  </p>
                </motion.div>

                {/* Capacity bars */}
                <div className="space-y-7">
                  {infraItems.map((item, i) => (
                    <InfraBar key={i} item={item} delay={i * 0.12} />
                  ))}
                </div>

                {/* Spec tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["120T–160T", "German Tech", "ISO Toolroom", "24hr Runs"].map((t) => (
                    <SpecTag key={t} label={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* B — CERTIFICATIONS */}
        <div className="relative z-10 mt-10">
          {/* Full-bleed dark band */}
          <div className="bg-stone-900 pt-20 lg:pt-24 pb-10 relative overflow-hidden">
            {/* Blueprint grid on dark */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "linear-gradient(#00b050 1px, transparent 1px), linear-gradient(90deg, #00b050 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16">
              {/* Header row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[9px] font-black tracking-[5px] uppercase text-[#00b050] mb-4"
                  >
                    Quality Assurance
                  </motion.p>
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[clamp(2.5rem,5vw,4.2rem)] font-black leading-[0.9] tracking-[-0.04em] text-white uppercase"
                    >
                      Certified to the<br />
                      <span style={{ color: GL }}>Highest Standard.</span>
                    </motion.h2>
                  </div>
                </div>

                {/* Odometer cluster */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex items-end gap-10 lg:gap-14 shrink-0"
                >
                  {[
                    { value: 100, suffix: "%", label: "Parts Inspected" },
                    { value: 5,   suffix: "+", label: "Certifications" },
                    { value: 20,  suffix: "yr", label: "Track Record" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="text-[2.4rem] font-black text-white leading-none tracking-tight tabular-nums">
                        <Odometer value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-[10px] tracking-[2px] uppercase text-stone-400 font-semibold mt-2">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Horizontally scrollable cert reel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <CertReel />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}