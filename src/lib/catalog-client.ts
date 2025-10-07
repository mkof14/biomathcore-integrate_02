const API = process.env.NEXT_PUBLIC_API_URL || "";

async function safeJson<T>(p: Promise<Response>, fallback: T): Promise<T> {
  try {
    const r = await p;
    if (!r.ok) return fallback;
    return (await r.json()) as T;
  } catch {
    return fallback;
  }
}

export async function fetchServicesByCategory(category: string) {
  if (!API) return [];
  return safeJson(
    fetch(`${API}/services?category=${encodeURIComponent(category)}`, {
      cache: "no-store",
    }),
    [],
  );
}

export async function fetchServiceBySlug(slug: string) {
  if (!API) return null;
  return safeJson(
    fetch(`${API}/services/${encodeURIComponent(slug)}`, { cache: "no-store" }),
    null,
  );
}
