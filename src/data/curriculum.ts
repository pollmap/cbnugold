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
      { month: "3월 초", title: "신입부원 모집 및 OT", desc: "1학기 신입부원 선발 후 OT 진행, 활동팀 배정" },
      { month: "3~6월", title: "정규 활동", desc: "신문 스크랩, 리포트 분석, 직무발표 등" },
      { month: "5월", title: "봄 나들이", desc: "중간고사 이후 벚꽃 나들이 예정" },
    ],
  },
  {
    label: "여름방학 (7~8월)",
    items: [
      { month: "7~8월", title: "재능봉사캠프", desc: "신입부원 필수 참여" },
      { month: "7~8월", title: "직무분석 경진대회", desc: "여름방학 집중 프로그램" },
    ],
  },
  {
    label: "2학기 (9~11월)",
    items: [
      { month: "9월 초", title: "신입부원 모집 및 OT", desc: "2학기 신입부원 선발 후 OT 진행, 활동팀 배정" },
      { month: "9~11월", title: "정규 활동 + 공모전", desc: "2학기 심화 활동" },
      {
        month: "10월",
        title: "MT",
        desc: "중간고사 이후 1박 2일 MT 예정",
      },
      { month: "11월", title: "성과보고회", desc: "1년 활동 결산 발표" },
    ],
  },
  {
    label: "겨울방학 (12~2월)",
    items: [
      { month: "12~2월", title: "재능봉사캠프", desc: "신입부원 필수 참여" },
    ],
  },
];
