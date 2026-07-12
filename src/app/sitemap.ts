import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/dashboard/business`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/dashboard/student`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/dashboard/admin`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
