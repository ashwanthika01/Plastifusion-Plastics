"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageCircle,
  X,
  FileText,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Infrastructure", href: "/infrastructure" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Custom Injection Moulding",
  "Mould Design & Manufacturing",
  "Prototype & Sampling",
  "Secondary Operations",
];

const phoneNumbers = [
  {
    name: "Rajeshwara Kumar",
    num: "+91 63817 33925",
    label: "Director",
  },
  {
    name: "Yokesh R",
    num: "+91 94437 33121",
    label: "Director",
  },
];

const whatsappNumbers = [
  {
    name: "Rajeshwara Kumar",
    num: "+91 94882 02023",
    label: "Director",
  },
  {
    name: "Yokesh R",
    num: "+91 99947 71121",
    label: "Director",
  },
];

/* ─── Modal ──────────────────────────────────────────────── */
function Modal({
  open,
  onClose,
  title,
  icon: Icon,
  items,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ElementType;
  items: Array<{
    name: string;
    num: string;
    label: string;
  }>;
  onSelect: (num: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: "#0b1a0f",
              border: "1px solid #1e3524",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "#1e3524" }}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} style={{ color: "#00b050" }} />
                <p className="font-bold text-white text-base">{title}</p>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Items */}
            <div className="p-4 space-y-2.5">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(item.num)}
                  className="w-full flex items-center justify-between rounded-xl px-5 py-4 text-left transition-all duration-200 group"
                  style={{
                    background: "#132219",
                    border: "1px solid #1e3524",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#006B2D";
                    e.currentTarget.style.background = "#006B2D14";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1e3524";
                    e.currentTarget.style.background = "#132219";
                  }}
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#00b050] mb-1">
                      {item.label}
                    </p>

                    <p className="text-white font-bold text-base mb-1">
                      {item.name}
                    </p>

                    <p className="text-lg font-black text-white tabular-nums">
                      {item.num}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-stone-600 group-hover:text-[#00b050] transition-colors"
                  />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <button
                onClick={onClose}
                className="w-full py-3 text-sm text-stone-500 hover:text-stone-300 transition-colors rounded-xl border border-white/5 hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const [callOpen, setCallOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);

  const handleCall = (num: string) => {
    window.location.href = `tel:${num.replace(/\D/g, "")}`;
    setCallOpen(false);
  };

  const handleWA = (num: string) => {
    window.open(`https://wa.me/${num.replace(/\D/g, "")}`, "_blank");
    setWaOpen(false);
  };

  return (
    <>
      <footer
        className="relative bg-[#060e08] text-white overflow-hidden"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Subtle top border */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #006B2D 30%, #00b050 50%, #006B2D 70%, transparent)",
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #006B2D 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          {/* ── MAIN GRID ─────────────────────────────── */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-14 border-b"
            style={{ borderColor: "#ffffff08" }}
          >
            {/* ── COL 1: Brand ── */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/logo.jpeg"
                    alt="Plastifusion Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center leading-tight">
                  <span className="text-lg font-black tracking-tight text-white uppercase leading-none">
                    Plastifusion
                  </span>
                  <span className="text-[10px] font-semibold tracking-[2px] text-[#00b050] uppercase mt-0.5">
                    Plastics Pvt. Ltd.
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
                Precision plastic injection moulding for automotive,
                electronics, medical, consumer, and industrial applications.
              </p>

              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border"
                style={{
                  borderColor: "#006B2D40",
                  color: "#00b050",
                  background: "#006B2D0c",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b050]" />
                Innovation in Every Mould
              </div>

              <div className="pt-2 space-y-2">
                {["ISO 9001:2015", "RoHS Compliant", "REACH Certified"].map(
                  (c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 text-xs text-stone-500"
                    >
                      <span className="text-[#006B2D] text-[8px]">◆</span>
                      {c}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ── COL 2: Quick Links ── */}
            <div>
              <p className="text-xs font-black tracking-[3px] uppercase text-stone-500 mb-6">
                Quick Links
              </p>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-between py-2.5 border-b text-stone-400 hover:text-white transition-colors duration-200"
                    style={{ borderColor: "#ffffff06" }}
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 text-[#00b050] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── COL 3: Services ── */}
            <div>
              <p className="text-xs font-black tracking-[3px] uppercase text-stone-500 mb-6">
                Our Solutions
              </p>
              <div className="space-y-4">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 group cursor-default"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-[#006B2D] group-hover:bg-[#00b050] transition-colors" />
                    <span className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors duration-200 leading-snug">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── COL 4: Contact ── */}
            <div>
              <p className="text-xs font-black tracking-[3px] uppercase text-stone-500 mb-6">
                Get in Touch
              </p>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "#006B2D18" }}
                  >
                    <MapPin size={15} style={{ color: "#00b050" }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[2px] uppercase text-stone-500 mb-1">
                      Address
                    </p>
                    <p className="text-sm leading-relaxed text-stone-400">
                      S.F.No.639/1, Site No.60,61,
                      <br />
                      Comsia Industrial Estate,
                      <br />
                      Vellamadai Village,
                      <br />
                      Coimbatore — 641110.
                    </p>
                  </div>
                </div>

                {/* Clickable contact rows */}
                {[
                  {
  icon: FileText, 
  label: "GSTIN",
  value: "33AAQCP9396K1ZG", 
  onClick: () => {},
},
                  {
                    icon: Phone,
                    label: "Contact",
                    value: "Call Us",
                    onClick: () => setCallOpen(true),
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Chat with Our Team",
                    onClick: () => setWaOpen(true),
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "plastifusion2026@gmail.com",
                    onClick: () => {
                      window.location.href =
                        "mailto:plastifusion2026@gmail.com";
                    },
                  },
                  {
                    icon: Globe,
                    label: "Website",
                    value: "www.plastifusionplastics.com",
                    onClick: () => {
                      window.open(
                        "https://www.plastifusionplastics.com",
                        "_blank"
                      );
                    },
                  },
                ].map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={i}
                      onClick={item.onClick}
                      className="flex items-start gap-3 w-full text-left group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 group-hover:bg-[#006B2D30]"
                        style={{ background: "#006B2D18" }}
                      >
                        <Icon size={15} style={{ color: "#00b050" }} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold tracking-[2px] uppercase text-stone-500">
                          {item.label}
                        </p>

                        <p className="text-sm text-stone-400 group-hover:text-[#00b050] transition-colors duration-200 mt-0.5">
                          {item.value}
                        </p>
                      </div>

                      {(item.label === "Call Us" ||
                        item.label === "WhatsApp") && (
                        <ArrowUpRight
                          size={14}
                          className="text-stone-600 group-hover:text-[#00b050] transition-colors mt-1"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ─────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-xs text-stone-600">
            <p>
              © 2026 Plastifusion Plastics Pvt. Ltd. All rights reserved. ·{" "}
              <span className="text-[#006B2D] hover:text-[#00b050] transition-colors cursor-pointer font-semibold">
                Designed by Ashwanthika Govindaraja
              </span>
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy-policy"
                className="hover:text-stone-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>·</span>
              <Link
                href="/terms"
                className="hover:text-stone-300 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Modals ──────────────────────────────────────── */}
      <Modal
        open={callOpen}
        onClose={() => setCallOpen(false)}
        title="Call Us"
        icon={Phone}
        items={phoneNumbers}
        onSelect={handleCall}
      />
      <Modal
        open={waOpen}
        onClose={() => setWaOpen(false)}
        title="WhatsApp Us"
        icon={MessageCircle}
        items={whatsappNumbers}
        onSelect={handleWA}
      />
    </>
  );
}