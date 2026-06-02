"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Factory, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8FAF8] pt-40 pb-28">
        <div className="container-custom">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              About Us
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
              Engineering Precision
              <span className="block text-[#006B2D]">
                Since 20+ Years
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-600">
              Plastifusion Plastics Pvt. Ltd specializes in
              high-quality precision plastic components using
              advanced injection moulding technologies for
              multiple industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-28">
        <div className="container-custom grid gap-16 lg:grid-cols-2">
          
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
              Our Story
            </p>

            <h2 className="mt-5 text-4xl font-bold text-gray-900 lg:text-5xl">
              Innovation in Every Mold
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              With over two decades of experience,
              Plastifusion Plastics has established itself
              as a trusted partner for precision plastic
              injection moulding solutions.
            </p>

            <p>
              Our expertise spans automotive, electronics,
              medical, industrial, and consumer goods sectors,
              delivering durable and cost-effective plastic
              components tailored to client requirements.
            </p>

            <p>
              From concept to final production, our engineering
              team ensures precision, consistency, and quality
              at every stage of manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F8FAF8] py-28">
        <div className="container-custom">
          
          <div className="grid gap-8 md:grid-cols-3">
            
            <div className="rounded-[30px] bg-white p-10 shadow-sm">
              <ShieldCheck className="text-[#006B2D]" size={40} />

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Quality First
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                ISO-certified manufacturing processes with
                strict inspection standards.
              </p>
            </div>

            <div className="rounded-[30px] bg-white p-10 shadow-sm">
              <Factory className="text-[#006B2D]" size={40} />

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Advanced Manufacturing
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                Modern injection moulding systems with
                precision engineering workflows.
              </p>
            </div>

            <div className="rounded-[30px] bg-white p-10 shadow-sm">
              <Users className="text-[#006B2D]" size={40} />

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Client Partnership
              </h3>

              <p className="mt-5 leading-relaxed text-gray-600">
                End-to-end engineering support from
                design to production delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}