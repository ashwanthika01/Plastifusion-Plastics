"use client";

import { motion } from "framer-motion";

const items = [
  "Advanced Injection Moulding Machines",
  "In-House Toolroom",
  "Quality Inspection Systems",
  "Prototype Development",
];

export default function Infrastructure() {
  return (
    <section className="bg-[#F8FAF8] py-28">
      <div className="container-custom">
        
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[40px] bg-gradient-to-br from-[#006B2D] to-green-700 p-10 text-white shadow-2xl">
              
              <h3 className="text-4xl font-bold">
                Modern Manufacturing
                <span className="block text-green-100">
                  Infrastructure
                </span>
              </h3>

              <div className="mt-10 space-y-5">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              Infrastructure
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Built for Scalable
              <span className="block text-[#006B2D]">
                Precision Production
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-gray-600">
              Our facility is equipped with advanced injection
              moulding machines, in-house tooling systems,
              inspection equipment, and rapid production workflows
              to ensure high-quality manufacturing outcomes.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              From prototyping to mass production, we maintain
              consistency, efficiency, and engineering precision
              across every stage of manufacturing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}