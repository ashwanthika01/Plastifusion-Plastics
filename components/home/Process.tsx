"use client";

import { motion } from "framer-motion";

const steps = [
  "Requirement Analysis",
  "Mould Design",
  "Prototype & Sampling",
  "Injection Moulding",
  "Inspection & Quality Check",
  "Final Delivery",
];

export default function Process() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">
        
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
            Manufacturing Process
          </p>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 lg:text-5xl">
            Streamlined Workflow for
            <span className="block text-[#006B2D]">
              Precision Manufacturing
            </span>
          </h2>
        </div>

        <div className="relative mt-24">
          
          {/* Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-green-100 lg:block" />

          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="rounded-[30px] border border-green-100 bg-[#F8FAF8] p-8 shadow-sm">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#006B2D] text-xl font-bold text-white">
                      {index + 1}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {step}
                    </h3>

                    <p className="mt-4 leading-relaxed text-gray-600">
                      Precision-focused manufacturing workflows
                      ensuring consistent quality and efficient production.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}