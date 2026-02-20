import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "지원 확인",
  robots: { index: false, follow: false },
};

export default function JoinCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
