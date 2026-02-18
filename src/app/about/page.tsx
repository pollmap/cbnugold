"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/Card";
import { curriculum } from "@/data/curriculum";
import { Target, Users, Network } from "lucide-react";

const visionCards = [
  {
    icon: Target,
    title: "전문성",
    description:
      "금융시장 분석, 리서치 리포트 작성, 직무 역량 강화를 통해 금융 전문가로서의 기본기를 다집니다.",
  },
  {
    icon: Users,
    title: "실전",
    description:
      "모의면접, 포트폴리오 실습, 투자대회 등 실전 경험을 통해 취업 역량을 극대화합니다.",
  },
  {
    icon: Network,
    title: "네트워크",
    description:
      "현직자 멘토링, 연합 활동, 알럼나이 네트워크를 통해 금융권 커리어를 함께 만들어갑니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="About" className="mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-6">
              충북대학교 금융권 취업 동아리
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              금은동은 2021년 신문스크랩 동아리로 출발하여, 현재 금융권 취업을
              목표로 하는 충북대학교 대표 금융 동아리로 성장했습니다.
              직무잡아드림 소속으로 체계적인 커리큘럼과 현직자 멘토링을 통해
              금융권 커리어를 함께 준비합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 md:py-32 bg-navy-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Vision" className="mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 text-center mb-16">
              우리가 추구하는 가치
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {visionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center py-10">
                  <card.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-100 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Organization" className="mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 text-center mb-16">
              조직 구조
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            {/* President */}
            <div className="bg-navy-800 border border-gold/30 rounded-xl px-8 py-4 text-center">
              <p className="text-xs text-gold uppercase tracking-wider mb-1">
                회장
              </p>
              <p className="text-lg font-semibold text-slate-100">이승현</p>
            </div>

            <div className="w-px h-8 bg-gold/20" />

            {/* VP */}
            <div className="bg-navy-800 border border-gold/20 rounded-xl px-8 py-4 text-center">
              <p className="text-xs text-gold/60 uppercase tracking-wider mb-1">
                부회장
              </p>
              <p className="text-lg font-semibold text-slate-100">전윤철</p>
            </div>

            <div className="w-px h-8 bg-gold/20" />

            {/* Teams */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                "리포트분석팀",
                "뉴스스크랩팀",
                "공모전팀",
                "운영팀",
              ].map((team) => (
                <div
                  key={team}
                  className="bg-navy-800 border border-gold/10 rounded-lg px-4 py-3 text-center"
                >
                  <p className="text-sm font-medium text-slate-300">{team}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-navy-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <span className="text-sm text-slate-500">소속 및 협력</span>
            <span className="text-slate-300 font-medium">직무잡아드림</span>
            <span className="text-gold/30">|</span>
            <span className="text-slate-300 font-medium">
              충남대 3F MOU
            </span>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Curriculum" className="mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 text-center mb-16">
              학기별 커리큘럼
            </h2>
          </motion.div>

          <div className="space-y-12">
            {curriculum.map((semester, si) => (
              <motion.div
                key={semester.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: si * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gold mb-4">
                  {semester.label}
                </h3>
                <div className="space-y-3">
                  {semester.items.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 bg-navy-800 border border-gold/10 rounded-lg p-4"
                    >
                      <span className="text-xs text-gold/60 font-mono whitespace-nowrap pt-0.5">
                        {item.month}
                      </span>
                      <div>
                        <p className="font-medium text-slate-200 text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
