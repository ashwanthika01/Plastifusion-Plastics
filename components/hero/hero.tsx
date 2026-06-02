"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, Play, Star, ShieldCheck, Award,
  Cog, Stethoscope, ExternalLink, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "ISO 9001:2015 Certified", "±0.05mm Precision Tolerance",
  "120–160 Tonne Machines",  "24–48 Hour Repeat Delivery",
  "20+ Years of Excellence", "Multi-Cavity Hot Runner Systems",
  "RoHS & REACH Compliant",  "Global Export Partner",
];

const STATS = [
  { value: "±0.05mm", label: "Tolerance" },
  { value: "24–48h",  label: "Repeat Order" },
  { value: "20+",     label: "Years Mastery" },
];

const CARDS = [
  {
    id: 201, label: "Auto Part", category: "Automotive",
    desc: "High-temp ABS & PA66 components",
    icon: Cog, accent: "#00c853", delay: 0.9,
  },
  {
    id: 180, label: "Medical Device", category: "Healthcare",
    desc: "FDA-grade precision micro-moulding",
    icon: Stethoscope, accent: "#40c4ff", delay: 1.05,
  },
];

const SLIDE_IMAGES = [
  { id: "1015", label: "Injection Moulding Floor" },
  { id: "1040", label: "Quality Inspection Lab" },
  { id: "1043", label: "Tool & Die Workshop" },
  { id: "1059", label: "Clean-Room Assembly" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as number[],
    },
  }),
};

/* ─── PORTFOLIO CARD ────────────────────────────────────── */
function PortfolioCard({ card }: { card: (typeof CARDS)[0] }) {
  const [hov, setHov] = useState(false);
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: card.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative cursor-pointer"
      style={{ width: 160 }}
    >
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        className="pointer-events-none absolute -inset-[3px] rounded-[18px]"
        style={{
          boxShadow: `0 0 28px 6px ${card.accent}22`,
          background: `linear-gradient(135deg,${card.accent}18,transparent 55%)`,
        }}
      />
      <motion.div
        animate={{ y: hov ? -5 : 0, scale: hov ? 1.025 : 1 }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
        className="relative overflow-hidden rounded-[16px]"
        style={{
          background: "rgba(6,9,7,0.88)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${hov ? card.accent + "50" : "rgba(255,255,255,0.14)"}`,
          boxShadow: hov
            ? `0 20px 44px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`
            : `0 6px 22px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: "border-color .28s, box-shadow .28s",
        }}
      >
        <div className="relative overflow-hidden" style={{ height: 90 }}>
          <motion.img
            src={`https://picsum.photos/id/${card.id}/320/200`}
            alt={card.label}
            animate={{ scale: hov ? 1.1 : 1.02 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.52))" }} />
          <motion.div
            animate={{ opacity: hov ? 1 : 0.72 }}
            className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[8px] font-semibold uppercase tracking-[1px]"
            style={{
              background: `${card.accent}1a`,
              border: `1px solid ${card.accent}44`,
              color: card.accent,
              backdropFilter: "blur(8px)",
            }}
          >
            <Icon size={7} />{card.category}
          </motion.div>
          <motion.div
            animate={{ x: hov ? "220%" : "-90%" }}
            transition={{ duration: 0.44, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2"
            style={{
              background: "linear-gradient(110deg,transparent 35%,rgba(255,255,255,0.16) 50%,transparent 65%)",
              transform: "skewX(-10deg)",
            }}
          />
        </div>
        <div className="px-3 pb-3 pt-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-semibold tracking-tight text-white/95">{card.label}</p>
            <motion.span
              animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 4 }}
              transition={{ duration: 0.15 }}
              style={{ color: card.accent }}
            >
              <ExternalLink size={10} />
            </motion.span>
          </div>
          <p className="mt-0.5 text-[9.5px] leading-snug text-white/40">{card.desc}</p>
          <div className="mt-2.5 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              animate={{ scaleX: hov ? 1 : 0.25 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left rounded-full"
              style={{ background: `linear-gradient(90deg,${card.accent},${card.accent}40)` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── IMAGE SLIDESHOW ───────────────────────────────────── */
function ImageSlideshow({
  imgY, imgScale, overlayOp, spotX, spotY,
}: {
  imgY: any; imgScale: any; overlayOp: any; spotX: any; spotY: any;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [go]);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 1.04 }),
    center: { x: "0%", opacity: 1, scale: 1.03, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 1.01, transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={`https://picsum.photos/id/${SLIDE_IMAGES[current].id}/1200/1600`}
            alt={SLIDE_IMAGES[current].label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <motion.div style={{ opacity: overlayOp }} className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent" />

      <motion.div
        style={{ x: spotX, y: spotY, background: "radial-gradient(ellipse 360px 220px at 50% 50%,rgba(0,180,80,0.11),transparent)" }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[260, 185, 112].map((sz, i) => (
          <motion.div key={sz}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 28 + i * 12, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-white/[0.055]"
            style={{ width: sz, height: sz }}
          />
        ))}
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-black/60 hover:text-white"
      >
        <ChevronLeft size={15} />
      </button>

      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md transition hover:bg-black/60 hover:text-white"
      >
        <ChevronRight size={15} />
      </button>

      <div className="absolute bottom-[22px] left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className="h-[5px] rounded-full transition-all duration-300"
            style={{
              width: i === current ? 18 : 5,
              background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      <motion.div
        key={`label-${current}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-5 left-5 z-20"
      >
        <p className="mb-0.5 text-[8px] uppercase tracking-[2px] text-white/35">Facility</p>
        <p className="text-[13px] font-medium text-white">{SLIDE_IMAGES[current].label} · Coimbatore, India</p>
      </motion.div>
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX  = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const spotY  = useSpring(mouseY, { stiffness: 80, damping: 24 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale  = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.7], [0.44, 0.68]);

  useEffect(() => { setMounted(true); }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(((e.clientX - r.left - r.width  / 2) / r.width)  * 18);
    mouseY.set(((e.clientY - r.top  - r.height / 2) / r.height) * 13);
  };

  return (
    /*
     * KEY FIX:
     * - `h-screen` = 100vh, covering the full viewport
     * - `pt-20` = 80px top padding to clear the fixed navbar (h-20)
     * - No subtraction math, no CSS variables needed
     * - `overflow-hidden` prevents any child from leaking outside
     * - `flex flex-col` so the ticker + body grid stack vertically
     *   and together fill exactly the padded space
     */
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex h-screen flex-col overflow-hidden bg-[#F7F9F6] pt-20"
      style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}
    >
      {/* ── TICKER ─────────────────────────────────────────── */}
      <div
        className="relative z-20 shrink-0 overflow-hidden"
        style={{ background: "linear-gradient(90deg,#005a25,#007a38)" }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-25%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-3 px-6 py-2 text-[10px] font-medium uppercase tracking-[1.4px] text-white/90"
            >
              {item}
              <span className="text-[5px] text-green-300/50">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── BODY GRID ─────────────────────────────────────── */}
      {/*
       * flex-1 + min-h-0: fills ALL remaining height after the ticker.
       * Without min-h-0, flex children can overflow their flex parent.
       */}
      <div
        className="relative z-10 grid min-h-0 flex-1 max-lg:flex max-lg:flex-col"
        style={{ gridTemplateColumns: "1fr 1.08fr" }}
      >

        {/* ── LEFT COLUMN ──────────────────────────────────── */}
        <div className="flex h-full min-h-0 flex-col justify-between overflow-hidden px-[clamp(20px,3.5vw,64px)] py-[clamp(6px,1vh,12px)]">

          {/* TOP BLOCK */}
          <div>
            {/* eyebrow */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#C2E0D0] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="block h-[7px] w-[7px] shrink-0 rounded-full bg-[#006B2D]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[1.3px] text-[#006B2D]">
                Established 2026 · Precision Since Day One
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mb-3 font-medium leading-[1.04] tracking-[-1.8px] text-gray-900"
              style={{ fontSize: "clamp(30px, 3.8vw, 54px)" }}
            >
              Engineering{" "}
              <span className="relative inline-block text-[#006B2D]">
                perfection
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#006B2D] to-[#00b050]"
                />
              </span>
              <br />in every part
            </motion.h1>

            {/* subline */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mb-5 max-w-[420px] text-[13.5px] leading-[1.75] text-gray-500"
            >
              Ultra-precision plastic injection moulding with{" "}
              <strong className="font-semibold text-gray-800">±0.05mm accuracy</strong>.
              {" "}From prototype to high-volume production for automotive, medical,
              and electronics leaders.
            </motion.p>

            {/* trust row */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {[1015, 1024, 1047].map((id) => (
                    <div key={id} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200 shadow-sm">
                      <img src={`https://picsum.photos/id/${id}/64/64`} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold leading-tight text-gray-900">Trusted by industry leaders</p>
                  <p className="text-[11px] text-gray-400">Automotive · Medical · Electronics</p>
                </div>
              </div>
              <div className="hidden h-6 w-px bg-gray-200 sm:block" />
              <div className="flex items-center gap-1.5">
                {[
                  { icon: <ShieldCheck size={11} />, label: "ISO 9001" },
                  { icon: <Award size={11} />, label: "RoHS" },
                ].map((c) => (
                  <span key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DDE8E0] bg-white px-3 py-1 text-[11px] text-gray-600 shadow-sm"
                  >
                    <span className="text-[#006B2D]">{c.icon}</span>{c.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 18px 40px rgba(0,107,45,0.28)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#006B2D] px-6 py-3 text-[13.5px] font-medium text-white shadow-lg shadow-[#006B2D]/20 hover:bg-[#004f20] transition-colors"
              >
                Request Instant Quote
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={15} />
                </motion.span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-[13.5px] font-medium text-gray-800 hover:border-[#C2E0D0] hover:bg-[#F0FAF4] transition-all"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F5EE]">
                  <Play size={11} className="ml-0.5 text-[#006B2D]" />
                </span>
                Factory Tour
              </motion.button>
            </motion.div>
          </div>

          {/* BOTTOM BLOCK: stats pinned to bottom */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden"
            animate={mounted ? "show" : "hidden"}
            className="grid grid-cols-3 gap-3 border-t border-gray-100/80 pt-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={i < STATS.length - 1 ? "border-r border-gray-100 pr-3" : ""}
              >
                <div
                  className="font-semibold leading-none tracking-tight text-[#006B2D]"
                  style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}
                >
                  {s.value}
                </div>
                <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.9px] text-gray-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT IMAGE PANEL ─────────────────────────────── */}
        <div className="relative hidden h-full overflow-hidden bg-zinc-950 lg:block">
          <ImageSlideshow
            imgY={imgY}
            imgScale={imgScale}
            overlayOp={overlayOp}
            spotX={spotX}
            spotY={spotY}
          />

          {/* live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[10px] tracking-wider text-white/85 backdrop-blur-md"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-green-400"
            />
            12 Lines Active Now
          </motion.div>

          {/* years card */}
          <motion.div
            initial={{ opacity: 0, x: 16, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            className="absolute right-5 top-5 z-20 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/96 px-4 py-3 shadow-2xl backdrop-blur-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006B2D] text-[18px] font-bold text-white">
              20
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-widest text-gray-400">Years of Excellence</p>
              <p className="text-[14px] font-semibold leading-tight text-gray-900">Unmatched Craft</p>
            </div>
          </motion.div>

          {/* rating card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/96 px-4 py-3.5 shadow-2xl backdrop-blur-md"
          >
            <div className="mb-1.5 flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#FACC15] text-[#FACC15]" />
              ))}
            </div>
            <p className="text-[17px] font-bold text-gray-900">4.98 / 5.0</p>
            <p className="text-[10px] text-gray-400">Client Satisfaction Score</p>
          </motion.div>

          {/* portfolio cards */}
          <div className="absolute bottom-11 right-5 z-20 flex flex-col gap-3">
            {CARDS.map((card) => (
              <PortfolioCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-px bg-gradient-to-r from-transparent via-[#006B2D]/30 to-transparent" />
    </section>
  );
}

/* ─── MOBILE SLIDESHOW ───────────────────────────────────── */
function MobileSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % SLIDE_IMAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <AnimatePresence initial={false} custom={direction} mode="sync">
      <motion.img
        key={current}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        src={`https://picsum.photos/id/${SLIDE_IMAGES[current].id}/800/400`}
        alt={SLIDE_IMAGES[current].label}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
  );
}