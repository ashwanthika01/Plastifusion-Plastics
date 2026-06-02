"use client";

import { motion } from "framer-motion";
import {
  Cog,
  Factory,
  Layers3,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "Custom Injection Moulding",
    description:
      "High-quality custom plastic component production with precision manufacturing workflows.",
  },
  {
    icon: Factory,
    title: "Mould Design & Manufacturing",
    description:
      "Single-cavity, multi-cavity, and family mould systems with hardened steel tooling.",
  },
  {
    icon: Layers3,
    title: "Prototyping & Sampling",
    description:
      "Rapid prototype development and short-run production for faster validation.",
  },
  {
    icon: Wrench,
    title: "Secondary Operations",
    description:
      "Insert moulding, overmoulding, and assembly services under one roof.",
  },
];

export default function Solutions() {
  return (
    <section className="bg-[#F8FAF8] py-28">
      <div className="container-custom">
        
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
            Our Solutions
          </p>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 lg:text-5xl">
            Complete Plastic Manufacturing
            <span className="block text-[#006B2D]">
              Solutions Under One Roof
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-[30px] border border-green-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-[#006B2D] transition group-hover:bg-[#006B2D] group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-5 leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}