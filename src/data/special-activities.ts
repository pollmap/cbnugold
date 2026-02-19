export interface SpecialActivity {
  title: string;
  description: string;
  tags: string[];
}

export const regularActivities: SpecialActivity[] = [
  {
    title: "신문 스크랩",
    description: "매주 각자 금융 신문을 스크랩해 네이버 공식 카페에 올리고, 4인 1조로 모여 분석·토의합니다. 시장 흐름을 읽는 눈을 기릅니다.",
    tags: ["#네이버공식카페"],
  },
  {
    title: "금융상품 세일즈 페어",
    description: "은행 및 증권 영업점에 방문하여 실제 상품에 관한 상담을 받고 세일즈 실습 및 상호평가를 진행합니다.",
    tags: ["#금융상품세일즈", "#시장분석"],
  },
  {
    title: "은퇴설계 실습",
    description: "각기 다른 페르소나를 가진 가상의 고객을 대상으로 퇴직연금 운용 및 포트폴리오를 작성하고 발표합니다.",
    tags: ["#PB"],
  },
  {
    title: "모의 면접 프로그램",
    description: "PT면접, 토론면접 등 금융권에서 자주 출제되는 면접을 실전과 유사한 환경에서 연습합니다.",
    tags: ["#면접대비", "#실전연습"],
  },
  {
    title: "리포트 분석",
    description: "공통된 대주제를 중심으로 전문기관의 리서치 보고서를 직무별로 읽고 심층분석을 진행합니다.",
    tags: ["#직무별팀", "#리서치", "#분석"],
  },
  {
    title: "직무발표",
    description: "금융권 직무를 조사하고 발표하며 직무 이해도를 높입니다.",
    tags: ["개인 발표", "직무 탐색"],
  },
];

export const etcActivities: SpecialActivity[] = [
  {
    title: "재능봉사캠프",
    description: "매 방학마다 진행하는 재능봉사캠프로, 신입부원은 필수 참여합니다.",
    tags: ["방학", "필수"],
  },
  {
    title: "현직자 멘토링",
    description: "금융권 현직 선배들과의 멘토링을 통해 실무 경험과 커리어 조언을 얻습니다.",
    tags: ["멘토링", "네트워크"],
  },
  {
    title: "한국은행 통화정책 경시대회",
    description: "한국은행에서 주최하는 통화정책 경시대회에 팀을 구성하여 참가합니다.",
    tags: ["대회", "한국은행"],
  },
  {
    title: "MT 및 단합활동",
    description: "학기 중 MT와 다양한 단합활동을 통해 동아리원 간 친목을 다집니다.",
    tags: ["MT", "친목"],
  },
];
