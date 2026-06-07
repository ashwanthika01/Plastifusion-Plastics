"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Infrastructure", href: "/infrastructure" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-b border-green-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* LOGO + BRAND — now visible on mobile too */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src="/logo.jpeg"
                  alt="Plastifusion Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-wide text-gray-900 leading-tight">
                  PLASTIFUSION
                </h2>
                <p className="text-xs tracking-[0.25em] text-gray-500">
                  PLASTICS PVT. LTD
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-10 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm font-medium text-gray-700 transition hover:text-[#006B2D]"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#006B2D] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA BUTTON */}
            <div className="hidden lg:block">
              <button className="group flex items-center gap-2 rounded-full bg-[#006B2D] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700">
                Request Quote
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition hover:border-green-300 lg:hidden"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MOBILE MENU ===================== */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col bg-white p-8 shadow-2xl lg:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                    <Image
                      src="/logo.jpeg"
                      alt="Plastifusion Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Plastifusion</h2>
                    <p className="text-xs tracking-widest text-gray-500">PLASTICS PVT. LTD</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenu(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-8 mt-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenu(false)}
                      className="text-3xl font-semibold text-gray-800 hover:text-[#006B2D] transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto pt-12">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenu(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#006B2D] py-4 font-semibold text-white shadow-lg hover:bg-green-700 transition"
                >
                  Request Quote
                  <ArrowRight size={20} />
                </Link>
                <p className="mt-6 text-center text-sm text-gray-500">
                  Innovation in Every Mould
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}