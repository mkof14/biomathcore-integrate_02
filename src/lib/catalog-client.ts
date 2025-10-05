export type ApiCategory = { slug?: string; id?: string; title?: string; name?: string; summary?: string; description?: string; count?: number; services?: ApiService[]; };
export type ApiService = { slug?: string; id?: string; title?: string; name?: string; summary?: string; description?: string; category?: string; categorySlug?: string; };

const endpoints = {
  categories: ["/api/catalog/categories", "/api/categories"],
  selection: ["/api/catalog/selection"]
};

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  for (const u of endpoints.categories) {
    const data = await getJSON<ApiCategory[] | { items?: ApiCategory[] }>(u);
    if (Array.isArray(data)) {
      return data.map(nrmCategory);
    }
    if (data && Array.isArray(data.items)) {
      return data.items.map(nrmCategory);
    }
  }
  return [];
}

export async function fetchServicesByCategory(slug: string): Promise<ApiService[]> {
  for (const u of endpoints.selection) {
    const urlA = `${u}?category=${encodeURIComponent(slug)}`;
    const urlB = `${u}?categorySlug=${encodeURIComponent(slug)}`;
    for (const tryUrl of [urlA, urlB]) {
      const data = await getJSON<ApiService[] | { items?: ApiService[] }>(tryUrl);
      if (Array.isArray(data)) {
        return data.map(nrmService);
      }
      if (data && Array.isArray((data as any).items)) {
        return (data as any).items.map(nrmService);
      }
    }
  }
  return [];
}

function nrmCategory(x: ApiCategory): ApiCategory {
  const slug = x.slug || x.id || toSlug(x.title || x.name || "");
  return {
    slug,
    id: slug,
    title: x.title || x.name || slugToName(slug),
    name: x.title || x.name || slugToName(slug),
    summary: x.summary || x.description || "",
    description: x.summary || x.description || "",
    count: x.count,
    services: x.services?.map(nrmService)
  };
}

function nrmService(x: ApiService): ApiService {
  const slug = x.slug || x.id || toSlug(x.title || x.name || "");
  return {
    slug,
    id: slug,
    title: x.title || x.name || slugToName(slug),
    name: x.title || x.name || slugToName(slug),
    summary: x.summary || x.description || "",
    description: x.summary || x.description || "",
    category: x.category || x.categorySlug
  };
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}
function slugToName(slug: string) {
  return slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
}
