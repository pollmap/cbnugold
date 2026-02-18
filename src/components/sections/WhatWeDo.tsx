"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { activities } from "@/data/activities";

export function WhatWeDo() {
  return (
    <section className="py-24 md:py-32 bg-marble-light">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel label="What We Do" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            금은동의 핵심 활동
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5 hover:border-t-2 hover:border-t-gold"
            >
              {/* Number */}
              <span className="text-5xl font-bold font-mono text-gold/20 group-hover:text-gold/40 transition-colors">
                {activity.number}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mt-4 mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-gold mb-4">{activity.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {activity.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="tag">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
