"use client";

import { motion } from "framer-motion";

export default function Overview() {
  return (
    <section className="relative bg-[#F8FAF8] py-28">
      <div className="container-custom">
        
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              About Plastifusion
            </p>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
              Precision Manufacturing
              <span className="block text-[#006B2D]">
                Built on Experience
              </span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-gray-600">
              Plastifusion Plastics Pvt. Ltd specializes in high-quality
              custom plastic components using advanced injection moulding
              technology for industrial and commercial applications.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              From concept to production, we deliver durable,
              cost-effective, and precision-engineered solutions for
              automotive, electronics, medical, consumer goods,
              and industrial sectors.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-green-100 bg-white px-6 py-4 shadow-sm">
                <h4 className="text-2xl font-bold text-[#006B2D]">
                  20+
                </h4>
                <p className="text-sm text-gray-600">
                  Years Experience
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-white px-6 py-4 shadow-sm">
                <h4 className="text-2xl font-bold text-[#006B2D]">
                  ISO
                </h4>
                <p className="text-sm text-gray-600">
                  9001:2015 Certified
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[40px] bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-100 blur-3xl opacity-70" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Manufacturing Excellence
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                      End-to-End
                      <span className="block text-[#006B2D]">
                        Plastic Solutions
                      </span>
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-[#006B2D] px-5 py-4 text-white">
                    120T–160T
                  </div>
                </div>

                <div className="space-y-5">
                  
                  <div className="rounded-2xl border border-gray-100 p-5">
                    <h4 className="font-semibold text-gray-900">
                      Advanced Materials
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      ABS, PP, PC, Nylon, POM, HDPE, LDPE, TPE,
                      glass-filled and flame-retardant grades.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-5">
                    <h4 className="font-semibold text-gray-900">
                      Precision Tolerances
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Critical dimensions maintained with
                      ±0.05mm manufacturing precision.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-5">
                    <h4 className="font-semibold text-gray-900">
                      Rapid Production
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Prototype to mass production with fast
                      turnaround and quality-focused workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}