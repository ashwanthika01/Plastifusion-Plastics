"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export default function Certifications() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-[#006B2D] p-14 text-white shadow-2xl"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-100">
                Quality Assurance
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight lg:text-5xl">
                Certified Manufacturing
                <span className="block text-green-200">
                  With Precision Standards
                </span>
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-green-50">
                Plastifusion Plastics follows strict quality
                inspection procedures and precision-focused
                manufacturing standards to ensure reliability
                and consistency in every component.
              </p>
            </div>

            <div className="space-y-5">
              
              <div className="flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <BadgeCheck className="mt-1 text-green-200" />

                <div>
                  <h3 className="text-xl font-semibold">
                    ISO 9001:2015 Certified
                  </h3>

                  <p className="mt-2 text-green-50">
                    International quality management standards
                    for manufacturing excellence.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <BadgeCheck className="mt-1 text-green-200" />

                <div>
                  <h3 className="text-xl font-semibold">
                    100% Inspection Process
                  </h3>

                  <p className="mt-2 text-green-50">
                    Rigorous inspection workflows for consistent
                    precision and product quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <BadgeCheck className="mt-1 text-green-200" />

                <div>
                  <h3 className="text-xl font-semibold">
                    Engineering Precision
                  </h3>

                  <p className="mt-2 text-green-50">
                    Critical dimensions maintained with
                    ±0.05mm tolerances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}