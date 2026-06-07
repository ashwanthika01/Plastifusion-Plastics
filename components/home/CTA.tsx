"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="bg-[#F8FAF8] pt-0 pb-0 m-0">
      <div className="container-custom m-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[#006B2D] to-green-700 px-10 py-20 text-center text-white shadow-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-100">
            Ready to Start?
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight lg:text-6xl">
            Let’s Build Precision Plastic
            Components for Your Business
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-green-50">
            From prototype development to mass production,
            Plastifusion Plastics delivers high-quality
            injection moulding solutions tailored to your needs.
          </p>

          <a
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#006B2D] transition hover:scale-105"
          >
            Request a Quote

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}