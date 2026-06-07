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
  ArrowRight,
  Play,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "ISO 9001:2015 Certified",
  "±0.05mm Precision",
  "120–160 Tonne Machines",
  "24–48 Hour Repeat Delivery",
  "20+ Years Excellence",
  "RoHS & REACH Compliant",
  "Global Export Partner",
];

const STATS = [
  { value: "±0.05mm", label: "Tolerance" },
  { value: "24–48h", label: "Repeat Order" },
  { value: "20+", label: "Years Mastery" },
];

const CARDS = [
  {
    id: 201,
    label: "AUTOMOTIVE",
    desc: "High-performance ABS & PA66 components",
    icon: "⚙️",
    accent: "#00c853",
  },
  {
    id: 180,
    label: "MEDICAL",
    desc: "FDA-grade micro precision moulding",
    icon: "🩺",
    accent: "#40c4ff",
  },
];

const SLIDE_IMAGES = [
  { id: "1015", label: "Injection Moulding Floor" },
  { id: "1040", label: "Quality Control Lab" },
  { id: "1043", label: "Tool & Die Workshop" },
  { id: "1059", label: "Clean Room Assembly" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
};

/* ─── PORTFOLIO CARD ────────────────────────────────────── */
function PortfolioCard({ card }: { card: (typeof CARDS)[0] }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative cursor-pointer group"
    >
      <div
        className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl"
        style={{ width: "172px" }}
      >
        <div className="relative h-44 overflow-hidden">
          <motion.img
            src={`https://picsum.photos/id/${card.id}/600/400`}
            alt={card.label}
            animate={{ scale: hov ? 1.08 : 1.02 }}
            className="h-full w-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xl">{card.icon}</span>
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              {card.label}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-white/80 line-clamp-2">{card.desc}</p>
          <motion.div
            animate={{ x: hov ? 4 : 0 }}
            className="mt-3 inline-flex items-center gap-1.5 text-[#00c853] text-xs font-medium"
          >
            Explore <ExternalLink size={13} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── IMAGE SLIDESHOW ───────────────────────────────────── */
function ImageSlideshow({
  imgY,
  imgScale,
  overlayOp,
}: {
  imgY: any;
  imgScale: any;
  overlayOp: any;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const SLIDE_IMAGES = [
  {
    id: 1,
    label: "Injection Moulding Facility",
    image: "/imm2.jpg",
  },
  {
    id: 2,
    label: "Precision Manufacturing",
    image: "/pim.jpg",
  },
  {
    id: 3,
    label: "Quality Inspection",
    image: "/abs.avif",
  },
];

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 4800);
    return () => clearInterval(t);
  }, [go]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
  key={current}
  src={SLIDE_IMAGES[current].image}
  alt={SLIDE_IMAGES[current].label}
  custom={direction}
  initial={{
    opacity: 0,
    scale: 1.06,
    x: direction > 0 ? 60 : -60,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    x: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.96,
    x: direction > 0 ? -80 : 80,
  }}
  transition={{
    duration: 0.85,
    ease: [0.23, 1, 0.32, 1],
  }}
  style={{
    y: imgY,
    scale: imgScale,
  }}
  className="absolute inset-0 h-full w-full object-cover"
/>
      </AnimatePresence>

      {/* Overlays */}
      <motion.div style={{ opacity: overlayOp }} className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Floating rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {[320, 240, 160].map((size, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 45 + i * 15, repeat: Infinity, ease: "linear" }}
            className="absolute border border-white/20 rounded-full"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => go(-1)}
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white/80 backdrop-blur-xl hover:bg-white/10 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white/80 backdrop-blur-xl hover:bg-white/10 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Info */}
      <motion.div
        key={`info-${current}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-10 left-8 z-30"
      >
        <p className="text-xs tracking-[2px] text-white/50">OUR FACILITY • COIMBATORE</p>
        <p className="mt-1 text-lg font-medium text-white">{SLIDE_IMAGES[current].label}</p>
      </motion.div>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 70, damping: 30 });
  const spotY = useSpring(mouseY, { stiffness: 70, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.11]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.75]);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 28);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-screen flex-col overflow-hidden bg-[#F7F9F6] pt-20"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Ticker */}
      <div className="relative z-30 shrink-0 bg-gradient-to-r from-[#005a25] to-[#007a38] py-2.5 text-white">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 text-xs font-medium tracking-[1.5px]">
              {item}
              <span className="text-green-300/40">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 grid min-h-0 flex-1" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
        {/* Left Content - unchanged */}
        <div className="flex h-full flex-col justify-between px-8 lg:px-16 py-10">
          {/* ... (Left content remains the same) ... */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="inline-flex items-center gap-3 rounded-2xl border border-[#C2E0D0] bg-white/90 px-5 py-2 shadow-sm backdrop-blur"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#006B2D]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#006B2D]">
                Precision Engineering Since 2026
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mt-6 text-5xl lg:text-[58px] leading-[1.05] tracking-[-2.4px] font-medium text-gray-900"
            >
              Engineering{" "}
              <span className="relative text-[#006B2D]">
                perfection
                <span className="absolute -bottom-1.5 left-0 h-1 w-full bg-gradient-to-r from-[#006B2D] to-[#00b050] rounded" />
              </span>{" "}
              in every part.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mt-6 max-w-md text-[15.5px] leading-relaxed text-gray-600"
            >
              World-class plastic injection moulding with uncompromising accuracy. 
              Trusted by Tier-1 automotive, medical device, and electronics manufacturers worldwide.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate={mounted ? "show" : "hidden"} className="mt-8 flex items-center gap-8">
              <div className="flex items-center gap-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#FACC15] fill-[#FACC15]" size={18} />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900">4.98 • Excellent</p>
                <p className="text-xs text-gray-500">Based on 180+ client reviews</p>
              </div>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-2xl bg-[#006B2D] px-8 py-4 text-white font-medium text-[15px] shadow-xl shadow-[#006B2D]/30 hover:bg-[#004f20] transition-all"
              >
                Get Instant Quote
                <ArrowRight size={18} />
              </motion.a>

              <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
>
  <Play size={18} className="text-[#006B2D]" />
  <span>Watch Factory Tour</span>
</motion.button>
            </motion.div>
          </div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-semibold tracking-tight text-[#006B2D]">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Visual Panel - ALIGNED TO MATCH REFERENCE */}
        <div className="relative hidden lg:block overflow-hidden bg-zinc-950">
          <ImageSlideshow imgY={imgY} imgScale={imgScale} overlayOp={overlayOp} />

          {/* 20 Years Badge - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-8 right-8 bg-white/95 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-2xl border border-white/60 flex items-center gap-4 z-30"
          >
            <div className="text-5xl font-bold text-[#006B2D]">20</div>
            <div className="text-sm leading-tight text-gray-900">
              Years of<br />
              <span className="font-semibold">Unmatched Excellence</span>
            </div>
          </motion.div>

          {/* Rating Card - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-24 left-30 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-3xl px-3 py-2 shadow-xl border border-white/60 text-center z-30"
          >
            <div className="flex justify-left gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-3xl font-semibold text-gray-900">4.98 / 5.0</p>
            <p className="text-xs text-gray-500 mt-1">Global Client Satisfaction</p>
          </motion.div>

          {/* Portfolio Cards - Right Side Stack */}
          <div className="absolute top-[220px] right-18 flex flex-col gap-2 z-30 scale-65 origin-top-right">
  {CARDS.map((card) => (
    <PortfolioCard key={card.id} card={card} />
  ))}
</div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006B2D]/30 to-transparent z-40" />
    </section>
  );
}