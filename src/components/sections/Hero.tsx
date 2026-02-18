"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import type { Stat } from "@/types";

const stats: Stat[] = [
  { number: "5", suffix: "년", label: "Since 2021" },
  { number: "8", suffix: "기", label: "현재 기수" },
  { number: "60", suffix: "+", label: "누적 멤버" },
  { number: "15", suffix: "+", label: "취업·인턴 배출" },
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex justify-center mb-6"
        >
          <Image
            src="/images/logo.png"
            alt="금은동 로고"
            width={200}
            height={62}
            className="h-12 w-auto"
            priority
          />
        </motion.div>

        {/* Main slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Invest in yourself
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-500 font-light mb-10"
        >
          충북대학교 금융권 취업 동아리 · Since 2021
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/join">
            <Button size="lg">지원하기</Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg">
              더 알아보기
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-gold font-mono">
                {stat.number}
                <span className="text-xl md:text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">
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
