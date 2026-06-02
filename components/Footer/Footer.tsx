"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

const quickLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Solutions",
    href: "/solutions",
  },
  {
    name: "Infrastructure",
    href: "/infrastructure",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const services = [
  "Custom Injection Moulding",
  "Mould Design & Manufacturing",
  "Prototype & Sampling",
  "Secondary Operations",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#032417] text-white">
      
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        
        {/* TOP */}
        <div className="grid gap-14 border-b border-white/10 py-20 lg:grid-cols-4">
          
          {/* COMPANY INFO */}
          <div>
            
            {/* LOGO */}
            <div className="flex items-center gap-4">
              
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white p-2">
                <Image
                  src="/logo.jpeg"
                  alt="Plastifusion Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  PLASTIFUSION
                </h2>

                <p className="text-xs tracking-[0.3em] text-green-200">
                  PLASTICS PVT. LTD
                </p>
              </div>
            </div>

            <p className="mt-8 leading-relaxed text-gray-300">
              Precision plastic injection moulding solutions
              delivering durable, high-quality, and cost-effective
              components for automotive, electronics, medical,
              consumer, and industrial applications.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-green-400/20 bg-green-400/10 px-5 py-2 text-sm text-green-200">
              Innovation in Every Mold
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-8 flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between text-gray-300 transition hover:text-green-300"
                >
                  {link.name}

                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Our Solutions
            </h3>

            <div className="mt-8 flex flex-col gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="text-gray-300"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 text-green-300">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Address
                  </p>

                  <p className="mt-1 leading-relaxed text-gray-200">
                    S.F.No.639/1, Site No.60,61 <br />
                    Comsia Industrial Estate, <br />
                    Vellamadai Village, <br />
                    Coimbatore - 641110.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 text-green-300">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <div className="mt-1 space-y-1 text-gray-200">
                    <p>+91 94882 02023</p>
                    <p>+91 63817 33925</p>
                    <p>+91 99947 71121</p>
                    <p>+91 94437 33121</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 text-green-300">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 text-gray-200">
                    plastifusion2026@gmail.com
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3 text-green-300">
                  <Globe size={18} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Website
                  </p>

                  <p className="mt-1 text-gray-200">
                    www.plastifusionplastics.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 py-8 text-center md:flex-row md:text-left">
          
          <p className="text-sm text-gray-400">
            © 2026 Plastifusion Plastics Pvt. Ltd.
            All rights reserved. - Designed by Agnexis Technologies
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link
              href="/privacy-policy"
              className="transition hover:text-green-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-green-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}