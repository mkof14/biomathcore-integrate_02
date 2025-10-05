import { CATEGORIES, getAllServices } from "@/lib/service-catalog";

export type SearchItem = {
  type: "category" | "service";
  slug: string;
  title: string;
  summary?: string;
  url: string;
  score: number;
};

export function buildIndex(): SearchItem[] {
  const cats: SearchItem[] = CATEGORIES.map(c => ({
    type: "category",
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    url: `/services/${c.slug}`,
    score: 0,
  }));

  const srvs: SearchItem[] = getAllServices().map(s => ({
    type: "service",
    slug: s.slug,
    title: s.title,
    summary: s.summary,
    url: `/svc/${s.slug}`,
    score: 0,
  }));

  return [...cats, ...srvs];
}

export function searchCatalog(q: string, limit = 20): SearchItem[] {
  const query = (q || "").trim().toLowerCase();
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const idx = buildIndex();

  const scored = idx.map(item => {
    const hay = `${item.title} ${item.slug} ${item.summary ?? ""}`.toLowerCase();
    let score = 0;

    for (const t of terms) {
      if (hay.includes(t)) score += 10;
      if (item.title.toLowerCase().includes(t)) score += 10;
      if (item.slug.toLowerCase().includes(t)) score += 6;
      if ((item.summary ?? "").toLowerCase().includes(t)) score += 4;
    }

    // точное совпадение — небольшой буст
    if (item.slug === query) score += 15;

    return { ...item, score };
  });

  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
