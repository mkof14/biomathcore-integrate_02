import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = [
    "", "services", "pricing", "about", "investors"
  ].map(p => ({ url: `${base}/${p}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 })) as MetadataRoute.Sitemap;
  return pages;
}
