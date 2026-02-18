import type { Placement, Award } from "@/types";

export const placements: Placement[] = [
  { company: "IBK 기업은행", position: "상반기 신입사원", type: "은행" },
  { company: "IBK 기업은행", position: "하반기 신입사원", type: "은행" },
  { company: "NH 농협은행", position: "하반기 6급 신입사원", type: "은행" },
  { company: "한국투자증권", position: "신입사원", type: "증권" },
  { company: "국민건강보험공단", position: "신입사원", type: "공기업" },
  { company: "흥국생명", position: "채용연계 인턴", type: "보험" },
  { company: "IBK 기업은행", position: "동계 청년 인턴", type: "은행" },
  { company: "예금보험공사", position: "청년 인턴", type: "공기업" },
  { company: "국민연금공단", position: "청년 인턴", type: "공기업" },
  { company: "기획재정부", position: "청년 인턴", type: "정부" },
  { company: "KB 국민은행", position: "디지털 서포터즈", type: "은행" },
];

export const awards: Award[] = [
  { title: "직무분석경진대회", result: "최우수상" },
  { title: "성과보고회", result: "최우수상" },
  { title: "미래내일 일경험사업", result: "고용노동부 장관상" },
  { title: "KB 폴라리스 25기", result: "우수단원" },
  { title: "N돌핀", result: "우수단원" },
];
