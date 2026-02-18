"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { generations, currentOfficers, totalMembers } from "@/data/members";

export default function PeoplePage() {
  const [activeGen, setActiveGen] = useState(
    generations[generations.length - 1].gen
  );

  const selectedGen = generations.find((g) => g.gen === activeGen);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="People" className="mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4">
              금은동을 만드는 사람들
            </h1>
            <p className="text-lg text-slate-400">
              누적{" "}
              <span className="text-gold font-mono font-bold">
                {totalMembers}
              </span>
              명의 멤버가 함께해왔습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Officers */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              현 임원진 (2026년 기준)
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentOfficers.map((officer) => (
                <div
                  key={officer.name}
                  className="flex items-center gap-4 bg-navy-800 border border-gold/20 rounded-xl p-5"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-gold font-bold text-lg">
                      {officer.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider">
                      {officer.role}
                    </p>
                    <p className="font-semibold text-slate-100">
                      {officer.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {officer.generation}기
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Generation Tabs */}
      <section className="py-24 md:py-32 bg-navy-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-slate-200 mb-6">
              기수별 현황
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {generations.map((g) => (
                <button
                  key={g.gen}
                  onClick={() => setActiveGen(g.gen)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeGen === g.gen
                      ? "bg-gold text-navy-900"
                      : "bg-navy-700 text-slate-300 hover:bg-navy-600"
                  }`}
                >
                  {g.gen}기
                </button>
              ))}
            </div>

            {/* Selected generation info */}
            {selectedGen && (
              <div className="bg-navy-800 border border-gold/10 rounded-xl p-6">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-bold font-mono text-gold">
                    {selectedGen.gen}기
                  </span>
                  <span className="text-sm text-slate-400">
                    {selectedGen.year}년
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">인원</p>
                    <p className="text-2xl font-bold font-mono text-slate-100">
                      {selectedGen.count}
                      <span className="text-sm text-slate-400 ml-1">명</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">회장</p>
                    <p className="text-slate-200 font-medium">
                      {selectedGen.president || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Summary grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <h3 className="text-sm font-medium text-slate-400 mb-4">
              전체 기수 요약
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {generations.map((g) => (
                <div
                  key={g.gen}
                  className={`text-center p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeGen === g.gen
                      ? "bg-gold/10 border-gold/30"
                      : "bg-navy-800 border-gold/5 hover:border-gold/15"
                  }`}
                  onClick={() => setActiveGen(g.gen)}
                >
                  <p className="text-xs text-slate-500">{g.gen}기</p>
                  <p className="text-lg font-bold font-mono text-slate-200">
                    {g.count}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
