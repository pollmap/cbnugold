import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "금은동 | 충북대학교 금융권 취업 동아리",
  description:
    "충북대학교 금융권 취업 동아리 금은동입니다. 뉴스스크랩, 리포트 분석, 현직자 멘토링, 직무분석 경진대회 등 실전 금융 커리어를 준비합니다.",
  keywords: [
    "충북대",
    "금융 동아리",
    "금은동",
    "취업 동아리",
    "금융권",
    "CBNU GOLD",
  ],
  openGraph: {
    title: "금은동 | 충북대학교 금융권 취업 동아리",
    description: "금융을 실전으로 배우다. Since 2021.",
    url: "https://cbnugold.com",
    siteName: "금은동",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard (Korean) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Inter + JetBrains Mono (English / Numbers) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
