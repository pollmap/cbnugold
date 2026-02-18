"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { regularActivities, specialActivities } from "@/data/special-activities";
import { FileText } from "lucide-react";

type Tab = "regular" | "special" | "archive";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<Tab>("regular");

  const tabs: { key: Tab; label: string }[] = [
    { key: "regular", label: "Regular Activity" },
    { key: "special", label: "Special Activity" },
    { key: "archive", label: "Archive" },
  ];

  const currentActivities =
    activeTab === "regular" ? regularActivities : specialActivities;

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
            <SectionLabel label="Activity" className="mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4">
              금은동의 활동
            </h1>
            <p className="text-lg text-slate-400">
              체계적인 정규 활동과 다양한 특별 활동으로 금융 역량을 키웁니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab bar */}
          <div className="flex gap-1 mb-12 bg-navy-800 rounded-xl p-1 max-w-md mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-gold text-navy-900"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "archive" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">
                리서치 아카이브
              </h3>
              <p className="text-sm text-slate-500">
                리서치 보고서 아카이브는 준비 중입니다.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentActivities.map((activity, i) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-navy-800 border border-gold/10 rounded-xl p-6 hover:border-gold/25 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
