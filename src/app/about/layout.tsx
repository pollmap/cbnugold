import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "동아리 소개",
  description:
    "금은동의 비전, 조직 구조, 학기별 커리큘럼을 소개합니다. 충북대학교 금융권 취업 동아리.",
  openGraph: {
    title: "동아리 소개 | 금은동",
    description:
      "금은동의 비전, 조직 구조, 학기별 커리큘럼을 소개합니다. 충북대학교 금융권 취업 동아리.",
    url: "https://cbnugold.vercel.app/about",
  },
  alternates: {
    canonical: "https://cbnugold.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
