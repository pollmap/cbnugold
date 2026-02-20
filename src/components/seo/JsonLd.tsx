export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "금은동",
    alternateName: "CBNU GOLD",
    url: "https://cbnugold.vercel.app",
    logo: "https://cbnugold.vercel.app/images/logo.png",
    foundingDate: "2021",
    description:
      "충북대학교 금융권 취업 동아리 금은동. 신문 스크랩, 리포트 분석, 현직자 멘토링, 직무분석 경진대회 등 실전 금융 커리어를 준비합니다.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "충북대학교",
      alternateName: "CBNU",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "금은동",
    alternateName: "CBNU GOLD",
    url: "https://cbnugold.vercel.app",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
