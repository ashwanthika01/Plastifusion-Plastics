"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

// ─── HERO (WITH FIXED BACKGROUND IMAGE) ─────────────────────────────────────
export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      {/* Fixed Background Image with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581092160607-4c7c9c0f5d3e?q=80&w=2070')", // Industrial factory / moulding theme
          backgroundAttachment: "fixed",
          opacity: 0.18,
        }}
      />

      {/* Subtle overlay to ensure readability */}
      <div
        className="absolute inset-0 bg-white z-[1]"
        style={{ opacity: 0.85 }}
      />

      {/* Subtle accent texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(0,176,80,0.12) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(0,176,80,0.08) 0%, transparent 50%)`
        }}
      />

      <div className="flex-1 flex items-center px-6 md:px-10 lg:px-14 max-w-[1440px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT - CREATIVE ABOUT US */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <FU delay={0.05}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: G }}
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
                <span className="text-[11px] tracking-[0.4em] uppercase font-bold" style={{ color: G }}>
                  WELCOME TO PLASTIFUSION PLASTICS
                </span>
              </div>
            </FU>

            <div className="mb-10">
              <CR delay={0.1}>
                <h1
                  className="font-black uppercase tracking-[-0.04em] leading-none"
                  style={{
                    fontSize: "clamp(5.5rem, 12vw, 10.5rem)",
                    color: D,
                  }}
                >
                  ABOUT
                </h1>
              </CR>
              <CR delay={0.25}>
                <h1
                  className="font-black uppercase tracking-[-0.04em] leading-none -mt-4"
                  style={{
                    fontSize: "clamp(5.5rem, 12vw, 10.5rem)",
                    WebkitTextStroke: `3px ${G}`,
                    color: "transparent",
                  }}
                >
                  US
                </h1>
              </CR>
            </div>

            <FU delay={0.45}>
              <p className="max-w-md text-[1.1rem] leading-relaxed font-light" style={{ color: "rgba(0,0,0,0.65)" }}>
                We engineer precision plastic injection moulding in Coimbatore with obsessive attention to every micron.
              </p>
            </FU>

            <FU delay={0.65} className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all hover:scale-105"
                style={{ background: G, color: "#fff" }}
                onMouseEnter={e => { e.currentTarget.style.background = GD; }}
                onMouseLeave={e => { e.currentTarget.style.background = G; }}
              >
                REQUEST QUOTE
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
            </FU>
          </div>

          {/* RIGHT - 3D ANIMATION */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-[460px] aspect-square"
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent rounded-[4rem] z-10" />
              
              <div className="relative z-20 w-full h-full rounded-[3.8rem] overflow-hidden border-[12px] border-white shadow-2xl">
                <ScanLine />
                <MouldCrossSection />
              </div>

              {/* Decorative floating element */}
              <motion.div
                className="absolute -top-8 -right-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg text-center border border-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: GD }}>Est. 2026</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

     
    </section>
  );
}