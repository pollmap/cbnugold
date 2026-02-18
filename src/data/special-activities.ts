export interface SpecialActivity {
  title: string;
  description: string;
  tags: string[];
}

export const regularActivities: SpecialActivity[] = [
  {
    title: "뉴스 스크랩",
    description: "매주 4인 1조로 금융 뉴스를 스크랩하고 분석·발표합니다.",
    tags: ["매주 화요일", "팀 활동"],
  },
  {
    title: "리포트 분석",
    description: "증권사 리서치 리포트를 직무별 팀으로 구성해 심층 분석합니다.",
    tags: ["직무별 팀", "리서치"],
  },
  {
    title: "직무 발표",
    description: "금융권 직무를 조사하고 발표하며 직무 이해도를 높입니다.",
    tags: ["개인 발표", "직무 탐색"],
  },
  {
    title: "금융연구실습",
    description: "기업분석, 산업분석 등 실제 금융 업무에 가까운 실습을 진행합니다.",
    tags: ["실습", "분석"],
  },
  {
    title: "모의 면접",
    description: "PT 면접, 토론 면접 등 실전과 동일한 환경에서 면접을 연습합니다.",
    tags: ["면접 대비", "실전"],
  },
  {
    title: "포트폴리오 실습",
    description: "자기소개서, 경력기술서 등 취업 서류를 작성하고 피드백합니다.",
    tags: ["자기소개서", "서류"],
  },
];

export const specialActivities: SpecialActivity[] = [
  {
    title: "DBGAPS 투자대회",
    description: "모의 투자 대회를 통해 투자 분석 및 의사결정 능력을 키웁니다.",
    tags: ["투자", "대회"],
  },
  {
    title: "직무분석 경진대회",
    description: "금융권 직무를 심층 분석하고 발표하는 교내 경진대회입니다.",
    tags: ["경진대회", "여름방학"],
  },
  {
    title: "성과보고회",
    description: "1년간의 동아리 활동을 결산하고 발표하는 연간 최대 행사입니다.",
    tags: ["연말", "발표"],
  },
  {
    title: "글로컬 연수",
    description: "해외 금융기관 방문 및 글로벌 금융 시장을 직접 경험합니다.",
    tags: ["해외", "연수"],
  },
  {
    title: "재능봉사캠프",
    description: "지역사회 봉사활동을 통해 사회적 책임을 실천합니다.",
    tags: ["봉사", "필수"],
  },
  {
    title: "충남대 3F 연합",
    description: "충남대학교 금융 동아리 3F와의 MOU를 통한 연합 활동입니다.",
    tags: ["연합", "네트워크"],
  },
];
