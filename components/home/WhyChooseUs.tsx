"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "ISO 9001:2015 certified manufacturing with strict quality inspection processes.",
  },
  {
    icon: Clock3,
    title: "Fast Turnaround",
    description:
      "2–4 weeks for new moulds and 24–48 hours for repeat production orders.",
  },
  {
    icon: BadgeDollarSign,
    title: "Cost Effective",
    description:
      "DFM-driven engineering minimizes waste while optimizing tooling and production cost.",
  },
  {
    icon: Users,
    title: "End-to-End Support",
    description:
      "Engineering guidance from material selection to final product delivery.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8FAF8] py-28">
      <div className="container-custom">
        
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#006B2D]">
            Why Choose Us
          </p>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 lg:text-5xl">
            Engineering Excellence
            <span className="block text-[#006B2D]">
              Backed by Precision
            </span>
          </h2>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

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
                  {feature.title}
                </h3>

                <p className="mt-5 leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}