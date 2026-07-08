import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Phone, Mail, MapPin, Globe, ArrowRight, CheckCircle2,
  AlertCircle, Send, ChevronRight, Zap, Clock, Shield,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact Plastifusion Plastics for plastic injection moulding solutions, project inquiries and manufacturing partnerships.",

  keywords: [
    "Contact Plastifusion Plastics",
    "Plastic Manufacturer Contact",
    "Injection Moulding Inquiry",
  ],
};

const C = {
  pageBg: "#F4F8F5",
  white: "#FFFFFF",
  green: "#00B050",
  greenDark: "#007A38",
  greenLight: "#33C870",
  greenXLight: "#E8F7EE",
  greenDim: "rgba(0,176,80,0.08)",
  greenGlow: "rgba(0,176,80,0.18)",
  ink: "#060D0A",
  inkMid: "#2A3D33",
  steel: "#5A7A68",
  steelLight: "#7A9A88",
  rule: "rgba(6,13,10,0.08)",
  ruleGreen: "rgba(0,176,80,0.14)",
};

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("pf-fonts")) return;
    const link = document.createElement("link");
    link.id = "pf-fonts";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
}

function FadeUp({
  children, delay = 0, className = "", style = {},
}: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ label }: { label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-3 mb-5">
      <motion.span
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-6 shrink-0 origin-left block"
        style={{ background: C.green }}
      />
      <span
        className="text-[11px] uppercase tracking-[0.22em]"
        style={{ color: C.green, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function SplitHeading({ lines, accent }: { lines: string[]; accent: string }) {
  return (
    <h1
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(36px, 6.5vw, 88px)",
        fontWeight: 800,
        lineHeight: 0.9,
        letterSpacing: "-0.035em",
        color: C.ink,
        marginBottom: "2rem",
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.08 + li * 0.11,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line === accent ? (
              <span style={{ color: C.green }}>{line}</span>
            ) : (
              line
            )}
          </motion.div>
        </div>
      ))}
    </h1>
  );
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, 22);
    return () => clearInterval(interval);
  }, [inView, text]);
  return (
    <span ref={ref}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: C.green }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(to / 40));
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Crosshair({ size = 56, opacity = 0.35 }: { size?: number; opacity?: number }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 56 56" fill="none"
      style={{ opacity }}
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="28" cy="28" r="24" stroke={C.green} strokeWidth="0.6" strokeDasharray="3 5" />
      <circle cx="28" cy="28" r="13" stroke={C.green} strokeWidth="0.4" strokeDasharray="2 4" />
      <circle cx="28" cy="28" r="2.5" fill={C.green} />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="28" y1="4" x2="28" y2="12"
          stroke={C.green} strokeWidth="0.8"
          style={{ transformOrigin: "28px 28px", transform: `rotate(${deg}deg)` }}
        />
      ))}
    </motion.svg>
  );
}

function Particles() {
  const pts = useRef([
    { id: 0, x: 63.464678874777626, y: 88.86645988719599, r: 3.4736203799341463, dur: 8.5, delay: 1.2 },
    { id: 1, x: 4.402253130135758, y: 80.25106359175885, r: 3.7813191616841495, dur: 12.3, delay: 2.1 },
    { id: 2, x: 87.30595916980694, y: 27.043151169457424, r: 2.8793498260916603, dur: 9.7, delay: 0.8 },
  ]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.r,
            height: p.r,
            background: "#00B050",
            opacity: 0.18,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.1, 0.28, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MorphBlob({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const dx = (mouseX - 0.5) * 30;
  const dy = (mouseY - 0.5) * 30;
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        right: "-60px", top: "50%",
        width: 420, height: 420,
        marginTop: -210,
      }}
      animate={{ x: dx * 0.4, y: dy * 0.3 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      <motion.div
        style={{
          width: "100%", height: "100%",
          background: `radial-gradient(circle at 40% 40%, rgba(0,176,80,0.10), rgba(0,176,80,0.03) 60%, transparent 80%)`,
          filter: "blur(32px)",
        }}
        animate={{
          borderRadius: [
            "60% 40% 70% 30% / 50% 60% 40% 50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "55% 45% 60% 40% / 45% 55% 45% 55%",
            "60% 40% 70% 30% / 50% 60% 40% 50%",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function MarqueeTicker() {
  const items = [
    "ISO Precision ±0.5mm",
    "Injection Moulding",
    "48hr Quote Turnaround",
    "DFM Feedback Free",
    "Prototype to Production",
    "PP · ABS · HDPE · Nylon",
    "Coimbatore · Tamil Nadu",
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(1500); // fallback

  useEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      // The track contains items × 2; half its scrollWidth = one full loop
      const fullWidth = trackRef.current!.scrollWidth;
      setOffset(fullWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Speed in px/s — stays consistent on all screen sizes
  const PX_PER_SEC = 60;
  const duration = offset / PX_PER_SEC;

  return (
    <div
      className="relative overflow-hidden border-y py-3"
      style={{ background: C.greenXLight, borderColor: C.ruleGreen }}
    >
      <motion.div
        ref={trackRef}
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -offset] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 shrink-0"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: C.greenDark,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: C.green }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function DiagonalCut({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative h-12 overflow-hidden" style={{ background: to }}>
      <svg
        viewBox="0 0 1440 48" preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      >
        <polygon points="0,0 1440,0 1440,48 0,0" fill={from} />
      </svg>
    </div>
  );
}

function TiltCard({
  children, className = "", style = {},
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 22 });
  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotX.set(((e.clientY - cy) / rect.height) * -10);
    rotY.set(((e.clientX - cx) / rect.width) * 10);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatsStrip() {
  const stats = [
    { icon: Clock, value: 48, suffix: "hr", label: "Quote turnaround" },
    { icon: Zap, value: 500, suffix: "+", label: "Components delivered" },
    { icon: Shield, value: 20, suffix: "yr", label: "Industry experience" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: C.ruleGreen }}>
      {stats.map((s, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <div
            className="flex flex-col items-center justify-center py-8 gap-1"
            style={{ background: C.white }}
          >
            <s.icon size={16} style={{ color: C.green, marginBottom: 4 }} strokeWidth={1.5} />
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px,3.5vw,40px)",
                fontWeight: 800,
                color: C.ink,
                lineHeight: 1,
              }}
            >
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: C.steelLight,
              }}
            >
              {s.label}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ContactPage() {
  return (
    <div
      className="overflow-x-hidden"
      style={{ background: C.pageBg, fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}
    >
      <FontLoader />
      <HeroContact />
      <MarqueeTicker />
      <StatsStrip />
      <DiagonalCut from={C.white} to={C.pageBg} />
      <DirectorsStrip />
      <DiagonalCut from={C.pageBg} to={C.white} />
      <DetailsRail />
      <MapSection />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1 · HERO
// ═══════════════════════════════════════════════════════════════════════════════
type FormStatus = "idle" | "sending" | "success" | "error";

function HeroContact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", subject: "", message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = sectionRef.current!.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xqeolnbr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _replyto: form.email }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    background: focused === name ? "#fff" : "rgba(6,13,10,0.03)",
    border: `1.5px solid ${focused === name ? C.green : C.rule}`,
    borderRadius: 10,
    color: C.ink,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    padding: "11px 15px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
    boxShadow: focused === name ? `0 0 0 4px rgba(0,176,80,0.09)` : "none",
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex flex-col overflow-hidden"
      style={{ background: C.pageBg, color: C.ink }}
    >
      <Particles />

      {/* Mouse-reactive blob — desktop only */}
      <div className="hidden lg:block">
        <MorphBlob mouseX={mouse.x} mouseY={mouse.y} />
      </div>

      {/* Crosshair decorations — desktop only */}
      <div className="pointer-events-none absolute top-6 left-8 hidden lg:block">
        <Crosshair size={44} opacity={0.3} />
      </div>
      <div className="pointer-events-none absolute bottom-16 right-12 hidden lg:block">
        <Crosshair size={32} opacity={0.2} />
      </div>
      <div className="pointer-events-none absolute top-4 right-4 hidden lg:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 0 L32 12 M32 0 L20 0" stroke={C.green} strokeWidth="1" opacity="0.25" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 hidden lg:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 32 L0 20 M0 32 L12 32" stroke={C.green} strokeWidth="1" opacity="0.25" />
        </svg>
      </div>

      {/*
        ── LAYOUT FIX ──────────────────────────────────────────────────────────
        Mobile:  single column, left panel then form panel stacked vertically
        Desktop: side-by-side [left | divider | form]
        Removed fixed minHeight on mobile so the form is never clipped.
        ────────────────────────────────────────────────────────────────────────
      */}
      <div
        className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_1px_540px]"
        style={{ minHeight: "calc(100dvh - 64px)" }}
      >
        {/* LEFT */}
        <div className="flex flex-col justify-center px-5 sm:px-10 lg:px-20 pt-10 pb-6 lg:pt-10 lg:pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Eyebrow label="Contact" />
            <SplitHeading
              lines={["Let's build", "something", "precise."]}
              accent="precise."
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: C.steel,
                fontSize: 15,
                lineHeight: 1.65,
                maxWidth: 400,
                marginBottom: "1.5rem",
              }}
              className="max-w-full"
            >
              <Typewriter text="Share your requirements and our engineering team will respond with a detailed quote within 48 hours." />
            </motion.p>

            {/* Promise list */}
            <div
              style={{
                paddingTop: "1.5rem",
                borderTop: `1px solid ${C.rule}`,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                "Quote turnaround within 48 hours",
                "DFM feedback included at no charge",
                "Prototype-to-production under one roof",
              ].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.1, type: "spring", stiffness: 320 }}
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: C.greenXLight,
                      border: `1px solid rgba(0,176,80,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={11} style={{ color: C.green }} />
                  </motion.div>
                  <span style={{ fontSize: 14, color: C.inkMid }}>{t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated vertical divider — desktop only */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block origin-top"
          style={{ background: C.rule }}
        />

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-5 sm:px-8 lg:px-9 pt-2 pb-10 lg:pt-10 lg:pb-12"
        >
          {/* ── FORM CARD ── */}
          <div
            style={{
              background: C.white,
              border: `1px solid ${C.rule}`,
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 2px 20px rgba(6,13,10,0.055)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 20, paddingBottom: 18,
                borderBottom: `1px solid ${C.rule}`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: C.greenXLight,
                  border: `1px solid rgba(0,176,80,0.25)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "default",
                }}
              >
                <Send size={14} style={{ color: C.green }} />
              </motion.div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.ink }}>
                  Send a Request
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steelLight }}>
                  plastifusion2026@gmail.com
                  yokesh@plastifusionplastics.com
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "48px 0", textAlign: "center", gap: 16,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.1 }}
                    style={{
                      width: 60, height: 60, borderRadius: "50%",
                      background: C.greenXLight,
                      border: `1.5px solid rgba(0,176,80,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={28} style={{ color: C.green }} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
                      Request sent.
                    </div>
                    <div style={{ fontSize: 13, color: C.steel, maxWidth: 260 }}>
                      We've received your message and will respond within 48 hours.
                    </div>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    onClick={() => setStatus("idle")}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em",
                      color: C.green, background: "none", border: "none",
                      cursor: "pointer", textDecoration: "underline", marginTop: 4,
                    }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                  className="w-full"
                >
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { name: "name", label: "Full Name *", placeholder: "Your name", required: true },
                      { name: "company", label: "Company", placeholder: "Organisation", required: false },
                    ].map((f) => (
                      <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <label style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10, textTransform: "uppercase",
                          letterSpacing: "0.18em", color: C.steelLight,
                        }}>
                          {f.label}
                        </label>
                        <input
                          name={f.name}
                          value={(form as Record<string, string>)[f.name]}
                          onChange={handleChange}
                          required={f.required}
                          placeholder={f.placeholder}
                          style={inputStyle(f.name)}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: C.steelLight }}>
                      Email Address *
                    </label>
                    <input
                      name="email" type="email"
                      value={form.email}
                      onChange={handleChange}
                      required placeholder="you@company.com"
                      style={inputStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Subject */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: C.steelLight }}>
                      Enquiry Type *
                    </label>
                    <select
                      name="subject" value={form.subject}
                      onChange={handleChange} required
                      style={{ ...inputStyle("subject"), cursor: "pointer" }}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>Select an enquiry type</option>
                      {["Quote Request", "Tooling / Mould Development", "Prototype Sampling",
                        "Material Consultation", "Partnership / Bulk Order", "General Enquiry"]
                        .map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: C.steelLight }}>
                      Message *
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} required
                      placeholder="Component requirements, material, volume, tolerance..."
                      rows={4}
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: 96 }}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "10px 14px", borderRadius: 8, fontSize: 13,
                          border: "1px solid rgba(220,38,38,0.22)",
                          background: "rgba(254,226,226,0.55)",
                          color: "#991B1B",
                        }}
                      >
                        <AlertCircle size={14} />
                        Failed to send. Email us at yokesh@plastifusionplastics.com or plastifusion2026@gmail.com
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: status === "sending" ? 1 : 1.022 }}
                    whileTap={{ scale: 0.975 }}
                    style={{
                      background: status === "sending" ? "rgba(0,176,80,0.38)" : C.green,
                      color: "#FFF", border: "none", borderRadius: 12,
                      padding: "13px 0", fontSize: 14, fontWeight: 700,
                      fontFamily: "'Syne', sans-serif",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      boxShadow: status === "sending" ? "none" : "0 4px 18px rgba(0,176,80,0.28)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 10, position: "relative", overflow: "hidden", marginTop: 2,
                    }}
                  >
                    {status !== "sending" && (
                      <motion.div
                        animate={{ x: ["-120%", "220%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
                        style={{
                          position: "absolute", inset: 0, width: "35%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                          style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.45)",
                            borderTopColor: "#fff",
                          }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Request
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight size={15} />
                        </motion.div>
                      </>
                    )}
                  </motion.button>

                  <p style={{ fontSize: 11, textAlign: "center", color: C.steelLight, marginTop: 2 }}>
                    We typically respond within 48 hours on business days.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2 · DIRECTORS
// ═══════════════════════════════════════════════════════════════════════════════
function DirectorsStrip() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: C.pageBg }}>
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        <FadeUp style={{ marginBottom: 36 }}>
          <Eyebrow label="Direct Contact" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 800,
              color: C.ink,
            }}
          >
            Speak with our Directors
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              name: "T. Rajeshwara Kumar",
              title: "Director",
              credentials: "",
              phones: ["+91 94882 02023", "+91 63817 33925"],
              accent: C.green,
              i: 0,
            },
            {
              name: "Yokesh R",
              title: "Director",
              credentials: "",
              phones: ["+91 99947 71121", "+91 94437 33121"],
              accent: C.greenDark,
              i: 1,
            },
          ].map((d) => (
            <FadeUp key={d.i} delay={d.i * 0.13}>
              <TiltCard>
                <motion.div
                  whileHover={{ boxShadow: `0 16px 40px rgba(0,176,80,0.14)`, borderColor: d.accent }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.rule}`,
                    borderRadius: 20,
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <motion.div
                      whileHover={{ scale: 1.07, rotate: 4 }}
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: C.greenXLight,
                        border: `1px solid rgba(0,176,80,0.22)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 15, fontWeight: 800,
                        color: C.greenDark,
                        flexShrink: 0,
                        cursor: "default",
                      }}
                    >
                      {d.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                    </motion.div>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: C.ink }}>
                        {d.name}
                        {d.credentials && (
                          <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: d.accent, verticalAlign: "middle" }}>
                            {d.credentials}
                          </span>
                        )}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.steelLight, marginTop: 2 }}>
                        {d.title}
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingTop: 16, borderTop: `1px solid ${C.rule}`, display: "flex", flexDirection: "column", gap: 10 }}>
                    {d.phones.map((p: string) => (
                      <motion.a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.16 }}
                        style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                      >
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: C.greenXLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Phone size={12} style={{ color: d.accent }} strokeWidth={2} />
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.inkMid }}>
                          {p}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3 · DETAILS RAIL
// ═══════════════════════════════════════════════════════════════════════════════
function DetailsRail() {
  const details = [
    {
      icon: Mail,
      label: "Email",
      value1: "yokesh@plastifusionplastics.com",
      value2:"plastifusion2026@gmail.com",
      sub: "Quotes, drawings & general enquiries",
      href: "mailto:plastifusion2026@gmail.com",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.plastifusionplastics.com",
      sub: "Full product & capability overview",
      href: "https://www.plastifusionplastics.com",
    },
    {
      icon: MapPin,
      label: "Factory",
      value: "S.F. No. 639/1, Site 60 & 61",
      sub: "Comsia Industrial Estate, Vellamadai, Coimbatore – 641110",
      href: "https://maps.google.com/?q=Comsia+Industrial+Estate+Coimbatore",
    },
  ];
  return (
    <section className="relative py-12 md:py-20" style={{ background: C.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        <FadeUp style={{ marginBottom: 36 }}>
          <Eyebrow label="Get in Touch" />
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {details.map((d, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <TiltCard>
                <motion.a
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, boxShadow: `0 18px 40px rgba(0,176,80,0.10)`, borderColor: C.greenGlow }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex", flexDirection: "column", gap: 16,
                    background: C.pageBg,
                    border: `1px solid ${C.rule}`,
                    borderRadius: 20,
                    padding: "24px",
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: C.greenXLight,
                      border: `1px solid rgba(0,176,80,0.2)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <d.icon size={18} style={{ color: C.green }} strokeWidth={1.6} />
                  </motion.div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: C.green, marginBottom: 5 }}>
                      {d.label}
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 6, lineHeight: 1.35 }}>
                      {d.label === "Email" ? (
  <>
    <a
      href={`mailto:${d.value1}`}
      style={{ display: "block", color: C.ink, textDecoration: "none" }}
    >
      {d.value1}
    </a>

    <a
      href={`mailto:${d.value2}`}
      style={{ display: "block", color: C.ink, textDecoration: "none" }}
    >
      {d.value2}
    </a>
  </>
) : (
  d.value
)}
                    </div>
                    <div style={{ fontSize: 12, color: C.steelLight, lineHeight: 1.6 }}>
                      {d.sub}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: C.green }}>
                    <ChevronRight size={13} />
                    Open
                  </div>
              </motion.a>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4 · MAP
// ═══════════════════════════════════════════════════════════════════════════════
function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative pb-12 md:pb-20" style={{ background: C.white }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.975, y: 20 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{
          margin: "0 16px 0",
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${C.rule}`,
          boxShadow: "0 4px 28px rgba(6,13,10,0.07)",
          position: "relative",
        }}
        className="sm:mx-8 md:mx-12 lg:mx-20"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.55 }}
          style={{
            position: "absolute", top: 14, left: 14, zIndex: 10,
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 14px",
            background: "rgba(255,255,255,0.93)",
            border: `1px solid ${C.rule}`,
            borderRadius: 99,
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.ink, textTransform: "uppercase", letterSpacing: "0.18em" }}>
            Comsia Industrial Estate, Coimbatore
          </span>
        </motion.div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d76.9!3d10.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859a1234567%3A0xabcdef!2sComsia+Industrial+Estate%2C+Vellamadai%2C+Coimbatore%2C+Tamil+Nadu+641110!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="380"
          className="md:h-[420px]"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Plastifusion factory location"
        />
      </motion.div>
    </section>
  );
}
