"use client";

import { motion } from "framer-motion";

const services = [
  "Custom Injection Moulding",
  "Mould Design & Manufacturing",
  "Prototype & Sampling",
  "Insert Moulding",
  "Overmoulding",
  "Assembly Operations",
];

export default function SolutionsPage() {
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
              Solutions
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
              Complete Plastic
              <span className="block text-[#006B2D]">
                Manufacturing Solutions
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28">
        <div className="container-custom">
          
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="rounded-[30px] border border-green-100 bg-[#F8FAF8] p-10"
              >
                <div className="h-16 w-16 rounded-2xl bg-[#006B2D]" />

                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  {service}
                </h3>

                <p className="mt-5 leading-relaxed text-gray-600">
                  Precision-engineered manufacturing services
                  tailored for industrial applications.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}