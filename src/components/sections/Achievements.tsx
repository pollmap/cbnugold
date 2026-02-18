"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { placements, awards } from "@/data/achievements";

const typeColors: Record<string, string> = {
  은행: "bg-blue-500/10 text-blue-400",
  증권: "bg-purple-500/10 text-purple-400",
  보험: "bg-green-500/10 text-green-400",
  공기업: "bg-amber-500/10 text-amber-400",
  정부: "bg-gold/10 text-gold",
};

export function Achievements() {
  return (
    <section className="py-24 md:py-32 bg-navy-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel label="Achievements" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-slate-50 text-center mb-4">
            2025년 주요 성과
          </h2>
          <p className="text-slate-400 text-center mb-16">
            금은동 출신의 취업·인턴 실적과 수상 내역
          </p>
        </motion.div>

        {/* Placements */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-slate-200 mb-6">
            취업·인턴 실적
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placements.map((p, i) => (
              <motion.div
                key={`${p.company}-${p.position}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-navy-800 border border-gold/10 rounded-lg p-4 hover:border-gold/20 transition-colors"
              >
                <p className="font-semibold text-slate-100 text-sm">
                  {p.company}
                </p>
                <p className="text-xs text-slate-400 mt-1">{p.position}</p>
                <span
                  className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium ${typeColors[p.type]}`}
                >
                  {p.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-6">
            수상 실적
          </h3>
          <div className="space-y-3">
            {awards.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-1 h-10 rounded-lg bg-gold/10 flex items-center px-4">
                  <span className="text-sm font-medium text-slate-200">
                    {award.title}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gold whitespace-nowrap">
                  {award.result}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
