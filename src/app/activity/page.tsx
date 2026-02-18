"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { regularActivities, etcActivities } from "@/data/special-activities";

type Tab = "regular" | "etc";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<Tab>("regular");

  const tabs: { key: Tab; label: string }[] = [
    { key: "regular", label: "정규 활동" },
    { key: "etc", label: "기타 활동" },
  ];

  const currentActivities =
    activeTab === "regular" ? regularActivities : etcActivities;

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
            <SectionLabel label="Activity" className="mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              금은동의 활동
            </h1>
            <p className="text-lg text-gray-500">
              체계적인 정규 활동과 다양한 기타 활동으로 금융 역량을 키웁니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="pb-24 md:pb-32 bg-marble-light">
        <div className="max-w-6xl mx-auto px-6 pt-16">
          {/* Tab bar */}
          <div className="flex gap-1 mb-12 bg-white border border-gray-200 rounded-xl p-1 max-w-sm mx-auto shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-gold text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
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
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gold/30 transition-colors shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
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
        </div>
      </section>
    </div>
  );
}
