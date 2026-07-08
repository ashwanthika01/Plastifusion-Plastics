"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Shield, Eye, Database, Lock, Share2, UserCheck,
  RefreshCw, Mail, ChevronRight, FileText, ArrowUpRight,
} from "lucide-react";

// ─── Design tokens — exact match to established system ────────────────────────
const C = {
  pageBg:      "#F4F8F5",
  white:       "#FFFFFF",
  green:       "#00B050",
  greenDark:   "#007A38",
  greenLight:  "#33C870",
  greenXLight: "#E8F7EE",
  greenDim:    "rgba(0,176,80,0.08)",
  ink:         "#060D0A",
  inkMid:      "#2A3D33",
  steel:       "#5A7A68",
  steelLight:  "#7A9A88",
  rule:        "rgba(6,13,10,0.08)",
  ruleGreen:   "rgba(0,176,80,0.14)",
};

// ─── Font loader ──────────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    if (document.getElementById("pf-fonts")) return;
    const l = document.createElement("link");
    l.id = "pf-fonts";
    l.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
  return null;
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
function Eyebrow({ label }: { label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <motion.span
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "block", height: 1, width: 24, flexShrink: 0,
          background: C.green, transformOrigin: "left",
        }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, textTransform: "uppercase",
          letterSpacing: "0.22em", color: C.green,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({
  children, delay = 0, style = {},
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Part-number badge — signature element ────────────────────────────────────
function PartNumber({ code }: { code: string }) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 10px",
        background: C.greenXLight,
        border: `1px solid ${C.ruleGreen}`,
        borderRadius: 6,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, fontWeight: 500,
        color: C.greenDark,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 5, height: 5, borderRadius: "50%",
          background: C.green,
        }}
      />
      {code}
    </div>
  );
}

// ─── Section definition ───────────────────────────────────────────────────────
interface PolicySection {
  id: string;
  code: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: PolicySection[] = [
  {
    id: "overview",
    code: "PP-01",
    icon: FileText,
    title: "Overview",
    content: (
      <>
        <p>
          Plastifusion Plastics ("we", "us", or "our") is a precision plastic
          components manufacturer based in Coimbatore, Tamil Nadu, India. We
          operate at S.F. No. 639/1, Site No. 60 &amp; 61, Comsia Industrial
          Estate, Vellamadai Village, Coimbatore – 641110.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, and safeguard
          information provided to us through our website{" "}
          <a href="https://www.plastifusionplastics.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            www.plastifusionplastics.com
          </a>{" "}
          and through direct business communications. We are committed to
          handling all data with the same precision we apply to our manufactured
          components.
        </p>
        <p>
          By using our website or contacting us, you agree to the practices
          described in this policy. This policy was last reviewed in June 2026.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    code: "PP-02",
    icon: Database,
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information in two ways: directly from you, and automatically through website technology.</p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Information you provide directly
        </h4>
        <ul>
          <li>Your full name and job title when you contact us</li>
          <li>Company or organisation name</li>
          <li>Business email address and phone number</li>
          <li>Technical requirements: component drawings, material specifications, volume estimates, and tolerance requirements you share in enquiries</li>
          <li>Any other information you choose to include in a quote request or message</li>
        </ul>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Information collected automatically
        </h4>
        <ul>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring website or search query</li>
          <li>Approximate geographic location (country or city level, from IP address)</li>
          <li>Device type (desktop, mobile, tablet)</li>
        </ul>
        <p>
          We do not collect payment card details, government identification
          numbers, or any sensitive personal data such as health or financial
          information.
        </p>
      </>
    ),
  },
  {
    id: "use",
    code: "PP-03",
    icon: Eye,
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Responding to enquiries</strong> — To prepare and deliver
            accurate quotations, design-for-manufacturing (DFM) feedback, and
            technical responses to your component requirements.
          </li>
          <li>
            <strong>Managing business relationships</strong> — To maintain
            records of orders, tooling development, and ongoing production
            projects.
          </li>
          <li>
            <strong>Improving our website</strong> — To understand which
            services generate the most interest and to make our site easier to
            navigate.
          </li>
          <li>
            <strong>Legal and contractual obligations</strong> — To fulfil
            obligations under any purchase order or manufacturing agreement
            entered into with your organisation.
          </li>
          <li>
            <strong>Communication</strong> — To send updates relevant to an
            active enquiry or order. We do not send unsolicited marketing
            emails.
          </li>
        </ul>
        <p>
          We will never use your technical drawings or component specifications
          for any purpose other than fulfilling your specific enquiry or order.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    code: "PP-04",
    icon: Lock,
    title: "Data Storage & Security",
    content: (
      <>
        <p>
          Enquiries submitted through our contact form are processed via
          Formspree, a trusted third-party form service. All data transmitted
          between your browser and our form endpoint is encrypted using
          industry-standard TLS (HTTPS).
        </p>
        <p>
          Technical documents such as CAD drawings or material datasheets
          shared via email are stored on secured business email infrastructure.
          Access is restricted to the directors and engineering staff directly
          involved in your project.
        </p>
        <p>
          We retain business enquiry records for a period of up to five years
          for the purposes of quality assurance, repeat-order facilitation, and
          legal compliance. Records associated with completed transactions are
          retained as required by applicable Indian tax and commercial law.
        </p>
        <p>
          While we implement appropriate technical and organisational measures
          to protect your information, no method of electronic transmission or
          storage is completely secure. We encourage you to contact us directly
          at{" "}
          <a href="mailto:plastifusion2026@gmail.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            plastifusion2026@gmail.com
          </a> or
          {" "}
          <a href="mailto:yokesh@plastifusionplastics.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            yokesh@plastifusionplastics.com
          </a>
          {" "}
          if you have concerns about a specific transmission.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    code: "PP-05",
    icon: Share2,
    title: "Sharing Your Information",
    content: (
      <>
        <p>
          We do not sell, rent, or trade your personal or business information
          to any third party.
        </p>
        <p>We may share your information only in the following limited circumstances:</p>
        <ul>
          <li>
            <strong>Service providers</strong> — Trusted technology partners
            (such as our form processing service, Formspree) who assist us in
            operating our website. These parties process data only on our
            behalf and are bound by appropriate data processing terms.
          </li>
          <li>
            <strong>Legal obligation</strong> — Where required to comply with
            applicable law, a court order, or a request from a competent
            government authority in India.
          </li>
          <li>
            <strong>Business transfer</strong> — In the event of a merger,
            acquisition, or sale of substantially all assets, your information
            may be transferred as part of that transaction, subject to
            equivalent privacy protections.
          </li>
          <li>
            <strong>Your consent</strong> — For any other purpose, only with
            your explicit consent.
          </li>
        </ul>
        <p>
          Technical drawings and intellectual property you share with us remain
          yours. We will not disclose them to any third party, including
          sub-contractors, without your prior written approval.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    code: "PP-06",
    icon: UserCheck,
    title: "Your Rights",
    content: (
      <>
        <p>
          You have rights over your personal data. You may, at any time, make a
          written request to us to:
        </p>
        <ul>
          <li>
            <strong>Access</strong> — Request a copy of the personal information
            we hold about you or your organisation.
          </li>
          <li>
            <strong>Correct</strong> — Ask us to update or correct any inaccurate
            information.
          </li>
          <li>
            <strong>Delete</strong> — Request that we delete your personal data,
            subject to any legal retention obligations we must fulfil.
          </li>
          <li>
            <strong>Object</strong> — Object to our use of your information for
            any purpose beyond responding to your active enquiry.
          </li>
          <li>
            <strong>Withdraw consent</strong> — Where processing is based on
            your consent, you may withdraw it at any time without affecting
            the lawfulness of prior processing.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:plastifusion2026@gmail.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            plastifusion2026@gmail.com
          </a> or{" "}
          <a href="mailto:yokesh@plastifusionplastics.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            yokesh@plastifusionplastics.com
          </a>
          . We will respond within a reasonable timeframe, typically within
          30 days.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    code: "PP-07",
    icon: Shield,
    title: "Cookies & Tracking",
    content: (
      <>
        <p>
          Our website uses minimal tracking technology to understand how
          visitors navigate our pages and which services are most relevant.
        </p>
        <p>
          We may use cookies or similar technologies for the following limited
          purposes:
        </p>
        <ul>
          <li>Essential operation of the website (session management)</li>
          <li>Anonymous analytics to count page visits and understand navigation patterns</li>
          <li>Remembering form field values to prevent accidental data loss</li>
        </ul>
        <p>
          We do not use advertising cookies or retargeting pixels. We do not
          track your activity across other websites. You may disable cookies in
          your browser settings; this will not prevent you from using our
          website, although some functionality may be affected.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    code: "PP-08",
    icon: RefreshCw,
    title: "Policy Updates",
    content: (
      <>
        <p>
          We review this Privacy Policy periodically and may update it to
          reflect changes in our practices, legal requirements, or website
          features. The most current version will always be published at this
          URL.
        </p>
        <p>
          Material changes will be indicated by an updated revision date at
          the top of this page. Where a change significantly affects how we
          use your data, we will make reasonable efforts to notify active
          contacts directly.
        </p>
        <p>
          Continued use of our website or services after a policy update
          constitutes acceptance of the revised terms.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    code: "PP-09",
    icon: Mail,
    title: "Contact & Grievances",
    content: (
      <>
        <p>
          For any privacy-related questions, concerns, or requests, please
          contact us directly:
        </p>
        <div
          style={{
            margin: "20px 0",
            padding: "20px 24px",
            background: C.greenXLight,
            border: `1px solid ${C.ruleGreen}`,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: C.ink }}>
            Plastifusion Plastics
          </div>
          {[
            "S.F. No. 639/1, Site No. 60 & 61",
            "Comsia Industrial Estate, Vellamadai Village",
            "Coimbatore – 641110, Tamil Nadu, India",
          ].map((line) => (
            <div key={line} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.steel }}>
              {line}
            </div>
          ))}
          <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 6 }}>
            <a href="mailto:plastifusion2026@gmail.com" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={12} />
              plastifusion2026@gmail.com
            </a>
            <a href="mailto:yokesh@plastifusionplastics.com" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={12} />
              yokesh@plastifusionplastics.com
            </a>

            <a href="tel:+919488202023" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, textDecoration: "none" }}>
              +91 94882 02023        
            </a>
            <a href="tel:+919994771121" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.green, textDecoration: "none" }}>
              +91 99947 71121
            </a>
          </div>
        </div>
        <p>
          We take all privacy concerns seriously and aim to resolve any
          grievance promptly and transparently. If you are not satisfied with
          our response, you may also approach the relevant data protection
          authority under applicable Indian law.
        </p>
      </>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div
      style={{
        background: C.pageBg,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        color: C.ink,
      }}
    >
      <FontLoader />
      <Hero />
      <MainContent activeSection={activeSection} setActiveSection={setActiveSection} />
      <CTAFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.rule}`,
        padding: "56px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient green glow */}
      <div
        style={{
          position: "absolute", top: -80, right: -60,
          width: 360, height: 360,
          borderRadius: "50%",
          background: "rgba(0,176,80,0.06)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative corner marks */}
      <svg
        style={{ position: "absolute", top: 16, left: 16, opacity: 0.2, pointerEvents: "none" }}
        width="28" height="28" viewBox="0 0 28 28" fill="none"
      >
        <path d="M0 28 L0 0 L28 0" stroke={C.green} strokeWidth="1" fill="none" />
      </svg>
      <svg
        style={{ position: "absolute", bottom: 16, right: 16, opacity: 0.15, pointerEvents: "none" }}
        width="28" height="28" viewBox="0 0 28 28" fill="none"
      >
        <path d="M28 0 L28 28 L0 28" stroke={C.green} strokeWidth="1" fill="none" />
      </svg>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow label="Legal" />
        </motion.div>

        {/* Hero headline */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: C.ink,
              margin: 0,
            }}
          >
            Your data,
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 28 }}>
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: C.green,
              margin: 0,
            }}
          >
            handled with precision.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          style={{
            fontSize: 15, lineHeight: 1.7, color: C.steel,
            maxWidth: 520, marginBottom: 32,
          }}
        >
          We apply the same exacting standards to data as we do to mould
          tolerances. This document tells you exactly what we collect,
          why we need it, and how it's protected.
        </motion.p>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: 12,
            paddingTop: 24, borderTop: `1px solid ${C.rule}`,
            paddingBottom: 32,
          }}
        >
          {[
            { label: "Effective date", value: "June 2026" },
            { label: "Jurisdiction", value: "Tamil Nadu, India" },
            { label: "Governing law", value: "Information Technology Act, 2000" },
            { label: "Sections", value: "9 clauses" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                padding: "8px 14px",
                background: C.pageBg,
                border: `1px solid ${C.rule}`,
                borderRadius: 8,
                display: "flex", flexDirection: "column", gap: 2,
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: C.steelLight }}>
                {m.label}
              </span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: C.inkMid }}>
                {m.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CONTENT — sticky sidebar + sections
// ═══════════════════════════════════════════════════════════════════════════════
function MainContent({
  activeSection, setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (s: string) => void;
}) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "48px 24px 80px",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr)",
        gap: 0,
      }}
      className="lg:grid-cols-[220px_1fr] lg:gap-16"
    >
      {/* Sticky sidebar TOC */}
      <aside
        className="hidden lg:block"
        style={{ position: "relative" }}
      >
        <div style={{ position: "sticky", top: 32 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, textTransform: "uppercase",
              letterSpacing: "0.2em", color: C.steelLight,
              marginBottom: 16,
            }}
          >
            Contents
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {SECTIONS.map((s) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveSection(s.id);
                }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 10px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: activeSection === s.id ? C.greenXLight : "transparent",
                  border: `1px solid ${activeSection === s.id ? C.ruleGreen : "transparent"}`,
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: activeSection === s.id ? C.green : C.steelLight,
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                    minWidth: 34,
                    transition: "color 0.2s",
                  }}
                >
                  {s.code}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12, fontWeight: activeSection === s.id ? 600 : 400,
                    color: activeSection === s.id ? C.ink : C.steel,
                    lineHeight: 1.3,
                    transition: "color 0.2s, font-weight 0.2s",
                  }}
                >
                  {s.title}
                </span>
              </motion.a>
            ))}
          </nav>
          {/* Floating green line */}
          <div
            style={{
              marginTop: 24, paddingTop: 20,
              borderTop: `1px solid ${C.rule}`,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, textTransform: "uppercase",
                letterSpacing: "0.18em", color: C.steelLight,
                marginBottom: 8,
              }}
            >
              Questions?
            </div>
            <a
              href="mailto:plastifusion2026@gmail.com"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12, color: C.green,
                textDecoration: "none", fontWeight: 500,
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              <Mail size={11} />
              Email us
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </aside>

      {/* Content sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {SECTIONS.map((section, idx) => (
          <PolicySectionBlock
            key={section.id}
            section={section}
            index={idx}
            setActive={setActiveSection}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Individual policy section ────────────────────────────────────────────────
function PolicySectionBlock({
  section, index, setActive,
}: {
  section: PolicySection;
  index: number;
  setActive: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) setActive(section.id);
  }, [inView, section.id, setActive]);

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.05 * Math.min(index, 3), ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "40px 0",
        borderBottom: index < SECTIONS.length - 1 ? `1px solid ${C.rule}` : "none",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: C.greenXLight,
            border: `1px solid ${C.ruleGreen}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            cursor: "default",
          }}
        >
          <section.icon size={18} style={{ color: C.green }} strokeWidth={1.6} />
        </motion.div>
        <div>
          <PartNumber code={section.code} />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 800,
              color: C.ink,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {section.title}
          </h2>
        </div>
      </div>

      {/* Prose */}
      <div
        style={{
          fontSize: 14.5,
          lineHeight: 1.75,
          color: C.steel,
          paddingLeft: 0,
        }}
        className="policy-prose"
      >
        {section.content}
      </div>

      {/* Green rule accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1, marginTop: 32,
          background: `linear-gradient(to right, ${C.green}, transparent)`,
          transformOrigin: "left",
          opacity: 0.25,
        }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function CTAFooter() {
  return (
    <section
      style={{
        background: C.white,
        borderTop: `1px solid ${C.rule}`,
        padding: "56px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: "36px 36px",
              background: C.greenXLight,
              border: `1px solid ${C.ruleGreen}`,
              borderRadius: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: "absolute", right: -40, top: -40,
                width: 200, height: 200,
                borderRadius: "50%",
                background: "rgba(0,176,80,0.08)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: C.white,
                  border: `1px solid ${C.ruleGreen}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Shield size={20} style={{ color: C.green }} strokeWidth={1.6} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20, fontWeight: 800,
                    color: C.ink, marginBottom: 6,
                  }}
                >
                  Questions about this policy?
                </div>
                <p
                  style={{
                    fontSize: 14, color: C.steel,
                    lineHeight: 1.65, margin: 0, maxWidth: 420,
                  }}
                >
                  We're happy to clarify how we handle your data or your company's
                  technical documents. Reach our directors directly.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.a
                href="mailto:plastifusion2026@gmail.com"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px",
                  background: C.green,
                  color: "#fff",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  boxShadow: "0 4px 16px rgba(0,176,80,0.25)",
                }}
              >
                <Mail size={14} />
                Email us
                <ArrowUpRight size={13} />
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.025, borderColor: C.green }}
                whileTap={{ scale: 0.975 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px",
                  background: "transparent",
                  color: C.ink,
                  border: `1.5px solid ${C.rule}`,
                  borderRadius: 10,
                  textDecoration: "none",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  transition: "border-color 0.2s",
                }}
              >
                Contact page
                <ChevronRight size={14} />
              </motion.a>
            </div>
          </div>
        </FadeUp>

        {/* Footer note */}
        <FadeUp delay={0.1}>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              paddingTop: 20,
              borderTop: `1px solid ${C.rule}`,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steelLight }}>
              © 2026 Plastifusion Plastics. All rights reserved.
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.steelLight }}>
              Document ref: LEGAL/PP-2026/v1.0
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}