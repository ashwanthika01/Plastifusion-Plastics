"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText, ShoppingCart, Wrench, AlertTriangle, Scale,
  Globe, Copyright, Ban, RefreshCw, Mail, ChevronRight,
  ArrowUpRight, Hammer,
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

// ─── Part-number badge ────────────────────────────────────────────────────────
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
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />
      {code}
    </div>
  );
}

// ─── Section definition ───────────────────────────────────────────────────────
interface TCSection {
  id: string;
  code: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: TCSection[] = [
  {
    id: "agreement",
    code: "TC-01",
    icon: FileText,
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          These Terms and Conditions ("Terms") govern your use of the website at{" "}
          <a href="https://www.plastifusionplastics.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            www.plastifusionplastics.com
          </a>{" "}
          and any business engagement with Plastifusion Plastics Pvt. Ltd.
          ("Plastifusion", "we", "us", or "our"), a company incorporated under
          the laws of India and operating from Comsia Industrial Estate,
          Coimbatore – 641110, Tamil Nadu.
        </p>
        <p>
          By accessing our website, submitting an enquiry, requesting a
          quotation, or placing an order, you confirm that you have read,
          understood, and agreed to these Terms on behalf of yourself or the
          organisation you represent. If you do not agree, please discontinue
          use of this website immediately.
        </p>
        <p>
          These Terms are effective as of June 2026 and apply to all website
          visitors, enquirers, and customers unless superseded by a separate
          written manufacturing or supply agreement executed between both
          parties.
        </p>
      </>
    ),
  },
  {
    id: "services",
    code: "TC-02",
    icon: Hammer,
    title: "Services & Scope",
    content: (
      <>
        <p>
          Plastifusion is a precision plastic injection moulding manufacturer.
          Our services include, but are not limited to:
        </p>
        <ul>
          <li>Design-for-manufacturing (DFM) review and feedback on customer-supplied component designs</li>
          <li>Tooling development, including the design, fabrication, and ownership of injection moulds</li>
          <li>Precision plastic component manufacturing using multi-cavity and single-cavity moulds</li>
          <li>Secondary operations including assembly, finishing, and quality inspection</li>
          <li>Material advisory services covering engineering-grade thermoplastics</li>
        </ul>
        <p>
          Information published on this website — including machine specifications,
          material capabilities, and tolerance ranges — is provided for general
          guidance only. Exact specifications for any given order are agreed in
          writing through a formal quotation and purchase order process.
        </p>
        <p>
          We reserve the right to decline any enquiry or order at our discretion,
          including where the requested component or material falls outside our
          technical capabilities or where we cannot meet the quality standards
          we hold ourselves to.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    code: "TC-03",
    icon: ShoppingCart,
    title: "Quotations & Orders",
    content: (
      <>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 0, marginBottom: 8 }}>
          Quotations
        </h4>
        <p>
          All quotations issued by Plastifusion are valid for a period of 30
          calendar days from the date of issue unless otherwise stated in
          writing. Quotations are based on the drawings, specifications, and
          volumes provided at the time of enquiry. Any subsequent changes to
          design, material, tolerance, or volume may require a revised
          quotation.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Purchase orders
        </h4>
        <p>
          A contract of supply is formed only when a written purchase order is
          received and confirmed in writing by Plastifusion. Verbal agreements
          or email confirmations not explicitly stating acceptance of a purchase
          order do not constitute a binding order.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Tooling orders
        </h4>
        <p>
          Orders for tooling (mould fabrication) require a separate written
          agreement specifying tooling cost, ownership, lead time, and approved
          part samples. Production orders may not commence until First Article
          Inspection (FAI) approval is confirmed in writing by the customer.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Changes and cancellations
        </h4>
        <p>
          Changes to a confirmed order must be requested in writing. Plastifusion
          will assess feasibility and may issue a revised quotation. Cancellation
          of a confirmed production order may result in charges for materials
          procured, tooling work completed, or machine time committed up to the
          point of cancellation notice.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    code: "TC-04",
    icon: Copyright,
    title: "Intellectual Property",
    content: (
      <>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 0, marginBottom: 8 }}>
          Customer IP
        </h4>
        <p>
          All technical drawings, CAD files, component designs, and
          specifications submitted by you remain your property at all times.
          By sharing them with us, you grant Plastifusion a limited, non-exclusive
          licence solely to use them for the purpose of preparing quotations and
          manufacturing the specific components ordered. We will not use,
          reproduce, share, or retain your technical data beyond what is
          necessary for these purposes without your written consent.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Tooling ownership
        </h4>
        <p>
          Unless explicitly agreed otherwise in a written tooling agreement,
          moulds and tooling fabricated by Plastifusion remain the property of
          Plastifusion until the tooling cost has been paid in full. Transfer of
          tooling ownership, if agreed, is documented separately in writing.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Website content
        </h4>
        <p>
          All content on this website — including text, graphics, photography,
          technical illustrations, and the overall visual design — is the property
          of Plastifusion Plastics or its licensors and is protected under applicable
          Indian and international intellectual property law. You may not reproduce,
          distribute, or publish any portion of this website without our prior
          written permission.
        </p>
      </>
    ),
  },
  {
    id: "quality",
    code: "TC-05",
    icon: Wrench,
    title: "Quality & Warranties",
    content: (
      <>
        <p>
          Plastifusion holds ISO 9001:2015 certification and applies a rigorous
          quality management system to all manufacturing activities. We warrant
          that components supplied will conform to the specifications agreed in
          writing at the time of order confirmation.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Inspection and acceptance
        </h4>
        <p>
          Customers are responsible for inspecting components upon receipt.
          Claims for defects must be raised in writing within 14 calendar days of
          delivery. Claims raised after this period will not be accepted unless
          a latent defect, concealed at the time of reasonable inspection, is
          identified and notified promptly upon discovery.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Remedy
        </h4>
        <p>
          For validated quality claims, Plastifusion's liability is limited, at
          our discretion, to replacement of the non-conforming components,
          rework at our facility, or a credit note equal to the value of the
          non-conforming quantity. We do not accept liability for consequential
          loss arising from non-conforming components unless agreed in a separate
          written supply agreement.
        </p>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: C.ink, marginTop: 20, marginBottom: 8 }}>
          Customer-supplied designs
        </h4>
        <p>
          Where components are manufactured to customer-supplied drawings and
          specifications, Plastifusion warrants dimensional and material
          compliance only. We are not responsible for design-related defects,
          functional failures, or fitness-for-purpose where the root cause lies
          in the customer's design. DFM feedback, where provided, is advisory;
          design approval responsibility rests with the customer.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    code: "TC-06",
    icon: Scale,
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, Plastifusion's
          aggregate liability to any customer, whether arising in contract,
          tort, or otherwise, shall not exceed the total value of the specific
          order or transaction giving rise to the claim.
        </p>
        <p>
          Plastifusion shall not be liable for:
        </p>
        <ul>
          <li>Indirect, consequential, incidental, or special damages of any kind</li>
          <li>Loss of profit, revenue, contracts, or anticipated savings</li>
          <li>Production downtime or delays caused by late delivery, except where a specific delivery guarantee has been made in writing</li>
          <li>Losses arising from your reliance on website content for purposes other than general information</li>
          <li>
            Temporary unavailability of this website for maintenance, technical
            failure, or reasons outside our control
          </li>
        </ul>
        <p>
          Nothing in these Terms limits liability for death or personal injury
          caused by our negligence, fraudulent misrepresentation, or any other
          liability that cannot be lawfully excluded.
        </p>
      </>
    ),
  },
  {
    id: "website",
    code: "TC-07",
    icon: Globe,
    title: "Website Use",
    content: (
      <>
        <p>
          You may use this website for lawful purposes only and in a manner that
          does not infringe the rights of others or restrict their use and
          enjoyment of this website.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>Attempt to gain unauthorised access to any part of this website or its underlying systems</li>
          <li>Use automated tools, scrapers, or bots to extract data from this website at scale</li>
          <li>Transmit any malicious code, virus, or disruptive data through this website</li>
          <li>Use this website or its content for competitive intelligence, benchmarking, or any commercial purpose not authorised by us</li>
          <li>Misrepresent your identity or affiliation when submitting enquiries</li>
        </ul>
        <p>
          This website may contain links to third-party websites for convenience.
          We are not responsible for the content or privacy practices of those
          sites and their inclusion does not imply endorsement.
        </p>
        <p>
          We make no warranties as to the completeness, accuracy, or
          fitness-for-purpose of any information published on this website.
          Content is provided for general information only and is subject to
          change without notice.
        </p>
      </>
    ),
  },
  {
    id: "prohibited",
    code: "TC-08",
    icon: Ban,
    title: "Confidentiality",
    content: (
      <>
        <p>
          Both parties acknowledge that in the course of business enquiries and
          manufacturing engagements, each may be exposed to confidential
          information belonging to the other, including but not limited to
          technical drawings, pricing, manufacturing processes, and business
          strategies.
        </p>
        <p>
          Each party agrees to:
        </p>
        <ul>
          <li>Keep all confidential information strictly private and not disclose it to any third party without prior written consent</li>
          <li>Use confidential information only for the purpose of the specific engagement for which it was shared</li>
          <li>Restrict access to confidential information to those personnel who have a genuine need to know</li>
          <li>Return or destroy confidential materials promptly upon request, or at the conclusion of the relevant engagement</li>
        </ul>
        <p>
          These obligations survive the termination of any order or business
          relationship and remain in effect for a period of five years from the
          date of disclosure, or indefinitely where technical drawings and
          proprietary designs are concerned.
        </p>
        <p>
          Confidentiality obligations do not apply to information that is or
          becomes publicly available through no fault of the receiving party,
          or that is required to be disclosed by law or a competent authority.
        </p>
      </>
    ),
  },
  {
    id: "law",
    code: "TC-09",
    icon: AlertTriangle,
    title: "Governing Law & Disputes",
    content: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of India. Any dispute, claim, or controversy arising out of or
          relating to these Terms, the use of this website, or any
          manufacturing engagement shall be subject to the exclusive
          jurisdiction of the courts of Coimbatore, Tamil Nadu, India.
        </p>
        <p>
          Before initiating formal legal proceedings, both parties agree to
          attempt resolution through good-faith negotiation for a period of
          not less than 30 days from the date the dispute is first raised in
          writing.
        </p>
        <p>
          If negotiation fails, disputes may be referred to arbitration under
          the Arbitration and Conciliation Act, 1996 (India), with a single
          arbitrator agreed upon by both parties, or appointed by the relevant
          authority if no agreement is reached.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    code: "TC-10",
    icon: RefreshCw,
    title: "Updates to These Terms",
    content: (
      <>
        <p>
          We may update these Terms from time to time to reflect changes in our
          services, applicable law, or business practices. The most current
          version will always be available at this URL.
        </p>
        <p>
          Material changes will be indicated by an updated effective date. For
          active customers and regular business contacts, we will make reasonable
          efforts to communicate significant changes directly.
        </p>
        <p>
          Continued use of this website or submission of an enquiry following
          any update constitutes your acceptance of the revised Terms. We
          recommend reviewing this page periodically.
        </p>
        <p>
          For questions about any provision of these Terms, please contact us
          at{" "}
          <a href="mailto:plastifusion2026@gmail.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            plastifusion2026@gmail.com
          </a> or {" "}
          <a href="mailto:yokesh@plastifusionplastics.com" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
            yokesh@plastifusionplastics.com
          </a>
          {" "}
          before proceeding.
        </p>
      </>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("agreement");

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

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
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
            Clear terms,
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
            no fine print.
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
          We believe business relationships should be built on clarity. These
          Terms define exactly what you can expect from us, and what we ask of
          you — no ambiguity, no surprises.
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
            { label: "Jurisdiction", value: "Coimbatore, India" },
            { label: "Governing law", value: "Laws of India" },
            { label: "Clauses", value: "10 sections" },
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
      <aside className="hidden lg:block" style={{ position: "relative" }}>
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

          {/* Contact shortcut */}
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
          <TCSectionBlock
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

// ─── Individual T&C section ───────────────────────────────────────────────────
function TCSectionBlock({
  section, index, setActive,
}: {
  section: TCSection;
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
                <Scale size={20} style={{ color: C.green }} strokeWidth={1.6} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20, fontWeight: 800,
                    color: C.ink, marginBottom: 6,
                  }}
                >
                  Questions about these Terms?
                </div>
                <p
                  style={{
                    fontSize: 14, color: C.steel,
                    lineHeight: 1.65, margin: 0, maxWidth: 420,
                  }}
                >
                  We're happy to walk through any clause before you place an
                  order. Contact our directors directly — clear agreements make
                  for better partnerships.
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
              Document ref: LEGAL/TC-2026/v1.0
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}