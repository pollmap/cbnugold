"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Stat } from "@/types";

const stats: Stat[] = [
  { number: "5", suffix: "년", label: "Since 2021" },
  { number: "8", suffix: "기", label: "현재 기수" },
  { number: "60", suffix: "+", label: "누적 멤버" },
  { number: "15", suffix: "+", label: "2025년 취업·인턴 배출" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden marble-texture">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      {/* Subtle marble vein pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.15) 50%, transparent 60%)",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20 md:pt-24 pb-14 md:pb-16">
        {/* Main slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight"
        >
          Invest in yourself
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-500 font-light mb-8 md:mb-10"
        >
          충북대학교 금융권 취업 동아리 · Since 2021
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/join" className="w-full max-w-[220px] sm:w-auto sm:max-w-none">
            <Button size="lg" className="w-full">
              지원하기
            </Button>
          </Link>
          <Link href="/about" className="w-full max-w-[220px] sm:w-auto sm:max-w-none">
            <Button variant="secondary" size="lg" className="w-full">
              더 알아보기
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 sm:mt-16 md:mt-20 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-2">
              <div className="text-3xl md:text-5xl font-bold text-gold font-mono">
                {stat.number}
                <span className="text-xl md:text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-2 leading-relaxed break-keep">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/15" />
    </section>
  );
}
