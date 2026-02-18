import type { Activity } from "@/types";

export const activities: Activity[] = [
  {
    number: "01",
    title: "NEWS CLIPPING",
    subtitle: "신문 스크랩",
    description:
      "매주 4인 1조로 금융 뉴스를 스크랩하고 분석·발표합니다. 시장 흐름을 읽는 눈을 기릅니다.",
    tags: ["매주 화요일", "팀 활동", "발표"],
  },
  {
    number: "02",
    title: "REPORT ANALYSIS",
    subtitle: "리포트 분석",
    description:
      "은행·증권·보험·금융공기업 등 직무별 팀을 구성해 증권사 리서치 리포트를 심층 분석합니다.",
    tags: ["직무별 팀", "리서치", "분석"],
  },
  {
    number: "03",
    title: "CAREER RESEARCH",
    subtitle: "금융연구실습",
    description:
      "직무분석 경진대회, 모의 PT 면접, 포트폴리오 실습 등 실전 취업 역량을 강화합니다.",
    tags: ["경진대회", "모의면접", "포트폴리오"],
  },
];
