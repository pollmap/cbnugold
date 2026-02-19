import type { Activity } from "@/types";

export const activities: Activity[] = [
  {
    number: "01",
    title: "신문 스크랩",
    subtitle: "금융 시사 분석",
    description:
      "매주 각자 금융 신문을 스크랩해 네이버 공식 카페에 올리고, 4인 1조로 모여 분석·토의합니다. 시장 흐름을 읽는 눈을 기릅니다.",
    tags: ["#네이버공식카페", "팀 활동", "발표"],
  },
  {
    number: "02",
    title: "리포트 분석",
    subtitle: "리서치 보고서 심층분석",
    description:
      "공통된 대주제를 중심으로 전문기관의 리서치 보고서를 직무별로 읽고 심층분석을 진행합니다.",
    tags: ["#직무별팀", "#리서치", "#분석"],
  },
  {
    number: "03",
    title: "금융상품 세일즈 페어",
    subtitle: "실전 영업 체험",
    description:
      "은행 및 증권 영업점에 방문하여 실제 상품에 관한 상담을 받고 세일즈 실습 및 상호평가를 진행합니다.",
    tags: ["#금융상품세일즈", "#시장분석"],
  },
];
