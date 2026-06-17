"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Gauge,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

/* ─── Data ─────────────────────────────────────────────── */

const stats = [
  { number: 20,  suffix: "+", label: "Years of Excellence",   note: "Est. 2026" },
  { number: 160, suffix: "T", label: "Injection Capacity",    note: "120T–160T Range" },
  { number: 50,  suffix: "K", label: "Parts Per Month",       note: "High-volume ready" },
  { number: 98,  suffix: "%", label: "On-Time Delivery",      note: "ISO 9001:2015" },
];

const capabilities = [
  { icon: Gauge,      label: "Ultra Precision",     sub: "±0.5mm tolerance" },
  { icon: Zap,        label: "Advanced Machinery",  sub: "120T–160T press force" },
  { icon: ShieldCheck,label: "Certified Quality",   sub: "ISO · RoHS · REACH" },
  { icon: Clock,      label: "Fast Turnaround",     sub: "48hr repeat cycle" },
];

/* ─── Animated Counter ──────────────────────────────────── */

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1400;
        const step = (timestamp: number, startTime: number) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
          else setCount(target);
        };
        requestAnimationFrame((t) => step(t, t));
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Magnetic Button ───────────────────────────────────── */

function MagneticCTA() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href="/solutions"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#00b050] px-10 py-5 text-black font-semibold text-lg tracking-tight"
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <span className="relative z-10">Explore Capabilities</span>
      <ArrowUpRight
        size={20}
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const heroY    = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textUpY  = useTransform(scrollYProgress, [0, 0.5], ["0px", "-30px"]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080c09] text-white overflow-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ── Noise grain overlay ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Ambient green glow ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse at center, #006B2D 0%, transparent 72%)" }}
      />

      {/* ════════════════════════════════════════════════ */}
      {/* BLOCK 1 — Editorial Header                       */}
      {/* ════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 pt-28 pb-16">

        {/* eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-[#00b050]" />
          <span className="text-[#00b050] text-xs font-semibold tracking-[3px] uppercase">
            Plastifusion Plastics Pvt. Ltd
          </span>
        </motion.div>

        {/* Giant editorial headline */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] uppercase"
          >
            Precision
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] uppercase"
            style={{
              WebkitTextStroke: "2px #2d5c3a",
              color: "transparent",
            }}
          >
            That Powers
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#00b050]"
          >
            Industries.
          </motion.h2>
        </div>

        {/* sub-copy + CTA row */}
        <div className="mt-12 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-md text-[17px] leading-relaxed text-zinc-400"
          >
            From prototype to high-volume production — delivering world-class plastic
            components from our Coimbatore facility with uncompromising accuracy and
            German-grade machinery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <MagneticCTA />
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* BLOCK 2 — Full-bleed Cinematic Image            */}
      {/* ════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full overflow-hidden" style={{ height: "65vh", minHeight: 440 }}>
        {/* parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-[-8%] z-0">
          <Image
            src="/hero.jpg"
            alt="Plastifusion manufacturing facility interior"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Dark cinematic scrim */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#080c09] via-transparent to-[#080c09]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#080c09]/60 via-transparent to-[#080c09]/60" />

        {/* ISO badge — floats over image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute z-20 top-8 right-8 md:right-16 flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-5 py-4"
        >
          <Award className="text-[#00b050] shrink-0" size={26} />
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Certified</p>
            <p className="text-white font-bold text-base leading-tight">ISO 9001:2015</p>
          </div>
        </motion.div>

        {/* Tolerance badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="absolute z-20 bottom-8 left-8 md:left-16"
        >
          <p className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-none tracking-tight text-[#00b050]">
            ±0.5<span className="text-white/50 font-light text-[0.5em]">mm</span>
          </p>
          <p className="text-xs tracking-[3px] uppercase text-zinc-500 mt-1">Tolerance on critical dims</p>
        </motion.div>

        {/* Scrolling text ticker at bottom of image */}
        <div className="absolute z-20 bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-2 bg-[#080c09]/40 backdrop-blur-sm">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {Array(4).fill(null).map((_, i) =>
              ["INJECTION MOULDING", "±0.5MM TOLERANCE", "ISO 9001:2015", "20+ YEARS", "COIMBATORE", "HIGH VOLUME PRODUCTION", "RoHS COMPLIANT", "REACH CERTIFIED"].map((t, j) => (
                <span key={`${i}-${j}`} className="text-[11px] font-semibold tracking-[3px] text-zinc-600">
                  {t}
                  <span className="ml-12 text-[#006B2D]">✦</span>
                </span>
              ))
            )}
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* BLOCK 3 — Stats + About Copy                    */}
      {/* ════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — manifesto copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: textUpY, opacity: opacity1 }}
          >
            <p className="text-xs font-semibold tracking-[3px] uppercase text-[#00b050] mb-6">
              About the Company
            </p>
            <h3 className="text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.05] mb-8">
              Engineering excellence<br />
              <em className="not-italic text-zinc-500">in every mould.</em>
            </h3>
            <p className="text-[17px] leading-relaxed text-zinc-400 mb-6">
              We specialise in high-precision custom injection moulding for demanding
              industries. Our state-of-the-art facility in Coimbatore combines German
              technology with over two decades of manufacturing expertise.
            </p>
            <p className="text-[17px] leading-relaxed text-zinc-400">
              Every component we produce meets the tightest dimensional tolerances —
              because when you build for the automotive, electronics, and medical
              sectors, failure simply isn't an option.
            </p>

            {/* inline divider with quote */}
            <div className="mt-10 border-l-2 border-[#00b050] pl-6">
              <p className="text-xl font-semibold leading-snug text-white">
                "Quality isn't an act. <br />
                It's a habit built into every press cycle."
              </p>
            </div>
          </motion.div>

          {/* RIGHT — big stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="relative group overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#006B2D]/40 transition-colors duration-500 p-7"
              >
                {/* corner accent */}
                <span className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-[#006B2D]/10 group-hover:bg-[#006B2D]/20 transition-colors" />

                <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-black leading-none tracking-tight text-white tabular-nums">
                  <Counter target={s.number} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-semibold text-zinc-300 leading-snug">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-zinc-600 tracking-wide">
                  {s.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* BLOCK 4 — Capabilities Horizontal Strip         */}
      {/* ════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5">
        {/* subtle green horizon line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b050]/50 to-transparent" />

        <div className="mx-auto max-w-[1400px] px-6 lg:px-16 py-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold tracking-[4px] uppercase text-zinc-100 text-center mb-14"
          >
            Our Core Strengths
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative px-8 py-10 first:pl-0 last:pr-0 hover:bg-white/[0.025] transition-colors duration-500"
                >
                  {/* icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#006B2D]/15 border border-[#006B2D]/20 group-hover:bg-[#006B2D]/25 transition-colors mb-7">
                    <Icon size={22} className="text-[#00b050]" />
                  </div>

                  {/* index number, ultra-light */}
                  <p className="absolute top-10 right-8 text-[40px] font-black text-white/[0.04] select-none leading-none">
                    0{i + 1}
                  </p>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00b050] transition-colors duration-300">
                    {cap.label}
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {cap.sub}
                  </p>

                  {/* animated bottom bar */}
                  <span className="absolute bottom-0 left-8 h-[2px] w-0 bg-[#00b050] group-hover:w-12 transition-all duration-500 rounded-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* BLOCK 5 — CTA Banner                            */}
      {/* ════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-16 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[28px] border border-[#006B2D]/30 bg-gradient-to-br from-[#0a1a0d] to-[#080c09] px-10 py-16 md:px-20 md:py-20"
        >
          {/* bg glow */}
          <div
            aria-hidden
            className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #00b050 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div>
              <p className="text-xs font-semibold tracking-[3px] uppercase text-[#00b050] mb-4">
                Ready to build together?
              </p>
              <h3 className="text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-tight">
                From concept to<br />
                <span className="text-[#00b050]">production-grade.</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <MagneticCTA />
              <motion.a
                href="/about"
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 px-10 py-5 text-white font-semibold text-lg tracking-tight hover:bg-white/5 transition-colors"
              >
                Our Story
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}