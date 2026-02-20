import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cbnugold.vercel.app";
  const lastModified = new Date("2026-02-20");

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/activity`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/join`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];
}
