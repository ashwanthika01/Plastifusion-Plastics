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
  X,
  Send,
  CheckCircle,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "ISO 9001:2015 Certified",
  "±0.5mm Precision",
  "120–160 Tonne Machines",
  "48 Hour Repeat Delivery",
  "20+ Years Excellence",
  "RoHS & REACH Compliant",
  "Global Export Partner",
];

const STATS = [
  { value: "±0.5mm", label: "Tolerance" },
  { value: "48h", label: "Repeat Order" },
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

// Using `any` here to satisfy framer-motion's Variants typing for custom easing arrays
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
};

/* ─── FACTORY TOUR MODAL ────────────────────────────────── */
function FactoryTourModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xaqzddvb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          preferred_date: form.date,
          message: form.message,
          _subject: `Factory Tour Video Call Request — ${form.company || form.name}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1.5px solid #D1E8DB",
    background: "#F4F8F5",
    fontSize: 14,
    color: "#111",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#4A6B58",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
        }}
      />

      {/* Centering wrapper — owns the fixed positioning so Motion doesn't conflict */}
      <div
        key="modal-wrapper"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          pointerEvents: "none",
        }}
      >
      {/* Sheet */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: "min(480px, calc(100vw - 32px))",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          padding: "28px 28px 32px",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          pointerEvents: "all",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 32, height: 32, borderRadius: "50%",
            border: "1.5px solid #E2EEE8",
            background: "#F4F8F5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#4A6B58",
          }}
        >
          <X size={16} />
        </button>

        {status === "success" ? (
          /* ── Success state ── */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "24px 0 8px" }}
          >
            <CheckCircle size={48} color="#006B2D" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>
              Request Sent!
            </h3>
            <p style={{ fontSize: 14, color: "#5A7A68", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 24px" }}>
              Our team will reach out within 48 hours to confirm your factory
              tour video call. We look forward to meeting you.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "10px 28px",
                background: "#006B2D",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Close
            </button>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#E8F7EE", borderRadius: 8,
                  padding: "4px 10px", marginBottom: 12,
                }}
              >
                <Play size={12} color="#006B2D" fill="#006B2D" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#006B2D", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Factory Tour
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>
                Schedule a Video Call
              </h3>
              <p style={{ fontSize: 13.5, color: "#5A7A68", lineHeight: 1.55, margin: 0 }}>
                Request a live virtual tour of our Coimbatore facility. Fill in
                your details and we'll confirm a time that works for you.
              </p>
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Name + Company */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Phone + Preferred date */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Preferred Date</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>What would you like to see? (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="e.g. injection moulding floor, quality lab, tooling workshop..."
                  rows={3}
                  style={{ ...inputStyle, resize: "none", lineHeight: 1.55 }}
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#d32f2f", margin: 0 }}>
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:plastifusion2026@gmail.com" style={{ color: "#006B2D" }}>
                    plastifusion2026@gmail.com
                  </a> or{" "}
                  <a href="mailto:yokesh@plastifusionplastics.com" style={{ color: "#006B2D" }}>
                    yokesh@plastifusionplastics.com
                  </a>
                </p>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={status === "sending" || !form.name || !form.email}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%",
                  padding: "13px 0",
                  background: status === "sending" ? "#4a9e6e" : "#006B2D",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: status === "sending" || !form.name || !form.email ? "not-allowed" : "pointer",
                  opacity: !form.name || !form.email ? 0.6 : 1,
                  fontFamily: "inherit",
                  transition: "background 0.2s, opacity 0.2s",
                  marginTop: 4,
                }}
              >
                {status === "sending" ? (
                  <>Sending…</>
                ) : (
                  <>
                    <Send size={16} />
                    Request Factory Tour
                  </>
                )}
              </motion.button>

              <p style={{ fontSize: 11.5, color: "#8AA898", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                We typically respond within 48 hours. No spam, ever.
              </p>
            </div>
          </>
        )}
      </motion.div>
      </div>
    </AnimatePresence>
  );
}

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
    { id: 1, label: "Injection Moulding Facility", image: "/imm2.jpg" },
    { id: 2, label: "Precision Manufacturing", image: "/pim.jpg" },
    { id: 3, label: "Quality Inspection", image: "/abs.avif" },
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
          initial={{ opacity: 0, scale: 1.06, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <motion.div
        style={{ opacity: overlayOp }}
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

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
  const [tourOpen, setTourOpen] = useState(false);

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
    <>
      {/* ── Factory Tour Modal ── */}
      {tourOpen && <FactoryTourModal onClose={() => setTourOpen(false)} />}

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative flex flex-col overflow-hidden bg-[#F7F9F6] pt-20 h-auto min-h-screen lg:h-screen"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Ticker */}
        <div className="relative z-30 shrink-0 overflow-hidden bg-gradient-to-r from-[#005a25] to-[#007a38] py-2.5 text-white">
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: [0, -1200] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="
              inline-flex items-center
              gap-2 md:gap-4
              px-4 md:px-8
              text-[10px] md:text-xs
              font-medium
              tracking-[1px] md:tracking-[1.5px]
              uppercase
            "
          >
            {item}
            <span className="text-green-300/40">•</span>
          </span>
        ))}
      </motion.div>
    </div>
        {/* Main Content */}
        <div
          className="relative z-20 flex flex-col lg:grid min-h-0 flex-1"
          style={{ gridTemplateColumns: "1fr 1.1fr" }}
        >
          {/* Left Content */}
          <div className="flex h-full flex-col justify-between px-6 sm:px-8 lg:px-16 py-8 lg:py-10">
            <div>
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={mounted ? "show" : "hidden"}
                className="inline-flex items-center gap-3 rounded-2xl border border-[#C2E0D0] bg-white/90 px-4 sm:px-5 py-2 shadow-sm backdrop-blur"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#006B2D]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#006B2D]">
                  Precision Engineering 
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate={mounted ? "show" : "hidden"}
                className="mt-6 text-4xl sm:text-5xl lg:text-[58px] leading-[1.05] tracking-[-2.4px] font-medium text-gray-900"
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
                World-class plastic injection moulding with uncompromising
                accuracy. Trusted by Tier-1 automotive, medical device, and
                electronics manufacturers worldwide.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate={mounted ? "show" : "hidden"}
                className="mt-8 flex items-center gap-8"
              >
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

                {/* ── Factory Tour → opens modal ── */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTourOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Play size={18} className="text-[#006B2D]" />
                  <span>Watch Factory Tour</span>
                </motion.button>
              </motion.div>
            </div>

            {/* ── STATS — fixed mobile layout ── */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="border-t border-gray-100 pt-8 mt-8 lg:mt-0"
            >
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <div
                      className="font-semibold tracking-tight text-[#006B2D] leading-none"
                      style={{ fontSize: "clamp(18px, 4.5vw, 36px)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual Panel — desktop only, unchanged */}
          <div className="relative hidden lg:block overflow-hidden bg-zinc-950">
            <ImageSlideshow imgY={imgY} imgScale={imgScale} overlayOp={overlayOp} />

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
    </>
  );
}