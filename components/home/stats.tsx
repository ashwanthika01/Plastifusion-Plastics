"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "20+",
    label: "Years Experience",
  },
  {
    value: "120T–160T",
    label: "Machine Capacity",
  },
  {
    value: "±0.05mm",
    label: "Precision Tolerance",
  },
  {
    value: "24–48hrs",
    label: "Repeat Orders",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-[30px] border border-green-100 bg-[#F8FAF8] p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-4xl font-bold text-[#006B2D]">
                {stat.value}
              </h3>

              <p className="mt-4 text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}