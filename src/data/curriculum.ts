export interface CurriculumItem {
  month: string;
  title: string;
  desc: string;
}

export interface Semester {
  label: string;
  items: CurriculumItem[];
}

export const curriculum: Semester[] = [
  {
    label: "1학기 (3~6월)",
    items: [
      { month: "3월", title: "OT + 팀 편성", desc: "신입부원 환영, 활동팀 배정" },
      { month: "3~6월", title: "정규 활동", desc: "신문 스크랩, 리포트 분석, 직무발표" },
      { month: "6~8월", title: "직무분석 경진대회", desc: "여름방학 집중 프로그램" },
    ],
  },
  {
    label: "여름방학",
    items: [
      { month: "7~8월", title: "방학 스터디", desc: "자격증 준비, 금융 지식 심화" },
    ],
  },
  {
    label: "2학기 (9~11월)",
    items: [
      { month: "9~11월", title: "정규 활동 + 공모전", desc: "2학기 심화 활동" },
      { month: "11월", title: "성과보고회", desc: "1년 활동 결산 발표" },
    ],
  },
  {
    label: "겨울방학",
    items: [
      { month: "12~2월", title: "방학 스터디 + 멘토링", desc: "현직자 멘토링, 자격증 준비" },
    ],
  },
];
