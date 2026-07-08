"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "What manufacturing services does Plastifusion Plastics offer?",
    answer:
      "We specialize in precision plastic injection moulding, mould design and development, in-house toolroom solutions, insert moulding, overmoulding, and end-to-end plastic component manufacturing for multiple industries.",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We manufacture precision plastic components for Automotive, Electronics, Consumer Goods, Medical, and Industrial sectors, delivering both prototype and high-volume production requirements.",
  },
  {
    question: "What materials can Plastifusion process?",
    answer:
      "We work with engineering-grade polymers including ABS, PP, PC, Nylon, POM, HDPE, LDPE, TPE, Glass-filled, and Flame-retardant materials based on customer specifications.",
  },
  {
    question: "What machine capacity do you have?",
    answer:
      "Our manufacturing facility operates precision injection moulding machines ranging from 120T to 160T, suitable for producing high-quality components across various applications.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "Quality is embedded into every stage of production through ISO 9001:2015 certified processes, Design for Manufacturability (DFM), precision tooling, and 100% inspection before dispatch.",
  },
  {
    question: "Can you develop custom moulds for new products?",
    answer:
      "Yes. Our in-house toolroom designs and manufactures single-cavity, multi-cavity, and family moulds tailored to your product requirements, ensuring durability and production efficiency.",
  },
  {
    question: "Do you support prototype manufacturing?",
    answer:
      "Absolutely. We manufacture everything from prototype components to large-scale production volumes, allowing customers to validate designs before mass manufacturing.",
  },
  {
    question: "What is your typical lead time?",
    answer:
      "New mould development generally takes 8–12 weeks depending on complexity, while repeat production orders can often be completed within 48 hours, subject to order quantity.",
  },
  {
    question: "Why choose Plastifusion Plastics?",
    answer:
      "Our precision-first philosophy, experienced leadership, in-house tooling, advanced manufacturing processes, and uncompromising quality standards allow us to consistently deliver reliable plastic components that meet demanding industry specifications.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Simply contact our team through the Request Quote section with your drawings, specifications, material requirements, or project details. Our engineers will review your requirements and provide a detailed quotation.",
  },
];

// ─── Single FAQ Row ───────────────────────────────────────────────────────────

interface FaqRowProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  total: number;
}

function FaqRow({ question, answer, index, isOpen, onToggle, total }: FaqRowProps) {
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`border-t border-white/10 ${isLast ? "border-b" : ""}`}
    >
      {/* Question trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-body-${index}`}
        className={`
          w-full flex items-center justify-between gap-6
          py-5 sm:py-6 px-0 text-left group
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-[#22C55E] focus-visible:ring-offset-2
          focus-visible:ring-offset-black
          ${isOpen ? "text-[#22C55E]" : "text-white hover:text-[#22C55E]"}
        `}
      >
        {/* Index + question */}
        <div className="flex items-start gap-5 sm:gap-8 flex-1 min-w-0">
          <span
            className={`
              flex-shrink-0 text-xs font-mono tracking-widest pt-0.5
              transition-colors duration-200
              ${isOpen ? "text-[#22C55E]" : "text-white/30 group-hover:text-[#22C55E]/60"}
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base sm:text-lg font-semibold leading-snug transition-colors duration-200 pr-4">
            {question}
          </span>
        </div>

        {/* Toggle icon */}
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center
            transition-all duration-300
            ${
              isOpen
                ? "border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]"
                : "border-white/20 text-white/50 group-hover:border-[#22C55E]/50 group-hover:text-[#22C55E]"
            }
          `}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Minus size={14} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                <Plus size={14} strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      {/* Answer body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-body-${index}`}
            role="region"
            aria-label={question}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25, delay: 0.06 },
            }}
            className="overflow-hidden"
          >
            <div className="pl-[calc(1.25rem+1.25rem+2rem)] sm:pl-[calc(1.25rem+2rem+3rem)] pb-6 pr-14">
              <p className="text-sm sm:text-base text-white/55 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-40px" });

  return (
    <section
      className="relative w-full bg-[#050505] overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Subtle horizontal rule at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* Very faint green vignette — top only, minimal */}
      <div
        className="absolute top-0 inset-x-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 100%)",
        }}
      />

      {/* ── Layout: two-column on lg, stacked on mobile ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16 xl:gap-24">

          {/* ── Left: header ── */}
          <motion.div
            ref={headerRef}
            className="mb-12 lg:mb-0 lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-[#22C55E] text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            >
              Frequently Asked
            </motion.p>

            {/* Heading */}
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold
                         text-white leading-[1.05] tracking-tight mb-6"
            >
              Questions
            </motion.h2>

            {/* Green rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 h-0.5 bg-[#22C55E] mb-6 origin-left"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="text-white/45 text-sm leading-relaxed max-w-xs"
            >
              Everything you need to know about Plastifusion Plastics — our manufacturing
              capabilities, quality standards, materials, tooling, and production process.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mt-10 hidden lg:block"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold
                           text-white border border-white/15 px-5 py-3 rounded-full
                           hover:border-[#22C55E] hover:text-[#22C55E]
                           transition-all duration-300 group"
              >
                Still have a question?
                <span className="text-[#22C55E] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: FAQ list ── */}
          <motion.div
            ref={listRef}
            initial={{ opacity: 0 }}
            animate={listInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            role="list"
            aria-label="FAQ list"
          >
            {faqs.map((faq, i) => (
              <div key={i} role="listitem">
                <FaqRow
                  question={faq.question}
                  answer={faq.answer}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  total={faqs.length}
                />
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-10 lg:hidden">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold
                           text-white border border-white/15 px-5 py-3 rounded-full
                           hover:border-[#22C55E] hover:text-[#22C55E]
                           transition-all duration-300 group"
              >
                Still have a question?
                <span className="text-[#22C55E] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
    </section>
  );
}