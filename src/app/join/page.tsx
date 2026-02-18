"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AccordionItem } from "@/components/ui/Accordion";
import { faqs } from "@/data/faqs";
import { Download, FileText, CheckCircle } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "서류 접수",
    date: "2.19(목) ~ 3.1(일)",
    status: "active" as const,
  },
  {
    step: "02",
    title: "서류 심사",
    date: "3.3(화) 결과 발표",
    status: "upcoming" as const,
  },
  {
    step: "03",
    title: "면접",
    date: "3.6(금)",
    status: "upcoming" as const,
  },
  {
    step: "04",
    title: "최종 합격",
    date: "3.7(토)",
    status: "upcoming" as const,
  },
];

const requirements = [
  "충북대학교 재학생 (휴학생 불가)",
  "매주 화요일 19:00 정기모임 참석 가능",
  "연속 2학기(1년) 이상 활동 가능",
  "3월 10일(화) 19:00 OT 참석 가능",
];

export default function JoinPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-24 md:py-32 bg-white marble-texture">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="open" className="mb-6 text-sm px-4 py-1.5">
              모집중
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              금은동 9기 신입부원 모집
            </h1>
            <p className="text-lg text-gray-500">
              서류 접수: 2.19(목) ~ 3.1(일) 18:00
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-24 md:pb-32 bg-marble-light">
        <div className="max-w-4xl mx-auto px-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-8">
              채용 프로세스
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative rounded-xl p-5 border transition-colors ${
                    step.status === "active"
                      ? "bg-gold/5 border-gold/30"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold ${
                      step.status === "active"
                        ? "text-gold"
                        : "text-gray-400"
                    }`}
                  >
                    {step.step}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-2 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500">{step.date}</p>
                  {i < processSteps.length - 1 && (
                    <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gold/30 text-lg">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 md:py-32 bg-white marble-texture">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              지원 자격
            </h2>
            <div className="space-y-3">
              {requirements.map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-600">{req}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-marble-light rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="text-gold font-medium">회비:</span> 학기
                10,000원 (조건 충족 시 환급)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Download */}
      <section className="py-24 md:py-32 bg-marble-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              지원서 다운로드
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <a
                href="/files/9기_금은동지원서_워드파일.docx"
                download
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-colors group shadow-sm"
              >
                <FileText className="w-10 h-10 text-gold/60 group-hover:text-gold transition-colors" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">워드 파일</p>
                  <p className="text-xs text-gray-400">.docx</p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" />
              </a>
              <a
                href="/files/9기_금은동지원서_한글파일.hwp"
                download
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-colors group shadow-sm"
              >
                <FileText className="w-10 h-10 text-gold/60 group-hover:text-gold transition-colors" />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">한글 파일</p>
                  <p className="text-xs text-gray-400">.hwp</p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-gold transition-colors" />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              파일명 양식: 이름_전화번호뒷4자리_[9기_금은동_지원서]
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <Link href="/join/apply">
              <Button size="lg">온라인 지원서 제출하기</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-white marble-texture">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel label="FAQ" className="mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12">
              자주 묻는 질문
            </h2>
            <div className="max-w-2xl mx-auto">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
