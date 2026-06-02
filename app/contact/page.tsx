"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white">
      
      {/* HERO */}
      <section className="bg-[#F8FAF8] pt-40 pb-28">
        <div className="container-custom">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              Contact Us
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
              Let’s Discuss Your
              <span className="block text-[#006B2D]">
                Manufacturing Requirements
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-28">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          
          {/* INFO */}
          <div className="space-y-8">
            
            <div className="flex gap-5 rounded-[30px] bg-[#F8FAF8] p-8">
              <MapPin className="text-[#006B2D]" />

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Address
                </h3>

                <p className="mt-3 leading-relaxed text-gray-600">
                  S.F.No.639/1, Site No.60,61,
                  Comsia Industrial Estate,
                  Vellamadai Village,
                  Coimbatore - 641110.
                </p>
              </div>
            </div>

            <div className="flex gap-5 rounded-[30px] bg-[#F8FAF8] p-8">
              <Phone className="text-[#006B2D]" />

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Phone
                </h3>

                <p className="mt-3 text-gray-600">
                  +91 94882 02023
                </p>

                <p className="text-gray-600">
                  +91 99947 71121
                </p>
              </div>
            </div>

            <div className="flex gap-5 rounded-[30px] bg-[#F8FAF8] p-8">
              <Mail className="text-[#006B2D]" />

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Email
                </h3>

                <p className="mt-3 text-gray-600">
                  plastifusion2026@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-[40px] border border-green-100 bg-white p-10 shadow-lg">
            
            <h2 className="text-3xl font-bold text-gray-900">
              Send an Inquiry
            </h2>

            <form className="mt-10 space-y-6">
              
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-gray-200 px-6 py-4 outline-none focus:border-[#006B2D]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-gray-200 px-6 py-4 outline-none focus:border-[#006B2D]"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full rounded-2xl border border-gray-200 px-6 py-4 outline-none focus:border-[#006B2D]"
              />

              <button className="rounded-full bg-[#006B2D] px-8 py-4 font-semibold text-white transition hover:bg-green-700">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}