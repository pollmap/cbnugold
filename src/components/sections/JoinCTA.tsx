"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function JoinCTA() {
  return (
    <section className="py-24 md:py-32 bg-marble-light">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-white border border-gold/20 rounded-2xl p-10 md:p-16 text-center overflow-hidden shadow-sm"
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gold/40" />

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            금은동 9기와 함께할 당신을 기다립니다
          </h2>
          <p className="text-gray-500 mb-8">
            서류 접수: 2.19(목) ~ 3.1(일) 18:00
          </p>
          <Link href="/join">
            <Button size="lg">지원하기</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
