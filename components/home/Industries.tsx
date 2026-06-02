"use client";

import { motion } from "framer-motion";

const industries = [
  "Automotive",
  "Electronics",
  "Consumer Goods",
  "Medical",
  "Industrial",
];

export default function Industries() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">
        
        <div className="grid gap-16 lg:grid-cols-2">
          
          {/* LEFT */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              Industries We Serve
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Trusted Across Multiple
              <span className="block text-[#006B2D]">
                Industrial Sectors
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-gray-600">
              We manufacture precision-engineered plastic components
              for diverse industries with strict quality standards,
              durability requirements, and production efficiency.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid gap-5 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-[30px] border border-green-100 bg-[#F8FAF8] p-8 transition hover:bg-[#006B2D]"
              >
                <h3 className="text-2xl font-bold text-gray-900 transition group-hover:text-white">
                  {industry}
                </h3>

                <p className="mt-4 text-gray-600 transition group-hover:text-green-100">
                  Precision plastic components engineered for
                  industrial-grade performance and durability.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}