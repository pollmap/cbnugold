import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "신입부원 모집",
  description:
    "금은동 신입부원을 모집합니다. 지원 절차, FAQ, 온라인 지원서 접수. 충북대학교 금융권 취업 동아리.",
  openGraph: {
    title: "신입부원 모집 | 금은동",
    description:
      "금은동 신입부원을 모집합니다. 지원 절차, FAQ, 온라인 지원서 접수.",
    url: "https://cbnugold.vercel.app/join",
  },
  alternates: {
    canonical: "https://cbnugold.vercel.app/join",
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
