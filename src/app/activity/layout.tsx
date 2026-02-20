import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "활동 소개",
  description:
    "금은동의 정규 활동과 기타 활동을 소개합니다. 신문스크랩, 리포트 분석, 현직자 멘토링 등.",
  openGraph: {
    title: "활동 소개 | 금은동",
    description:
      "금은동의 정규 활동과 기타 활동을 소개합니다. 신문스크랩, 리포트 분석, 현직자 멘토링 등.",
    url: "https://cbnugold.vercel.app/activity",
  },
  alternates: {
    canonical: "https://cbnugold.vercel.app/activity",
  },
};

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
