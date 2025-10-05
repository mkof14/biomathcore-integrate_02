import { getBaseUrl } from "./baseUrl";

export function apiUrl(path: string = "/") {
  if (!path) return getBaseUrl();
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return getBaseUrl().replace(/\/+$/,'') + path;
}

/** Нормализуем вход fetch к абсолютному URL */
function toAbs(input: any, init?: RequestInit): [any, RequestInit | undefined] {
  try {
    if (typeof input === "string") return [apiUrl(input), init];
    if (typeof URL !== "undefined" && input instanceof URL) return [apiUrl(input.toString()), init];
    if (typeof Request !== "undefined" && input instanceof Request) {
      const abs = apiUrl(input.url);
      const req = new Request(abs, input);
      return [req, init];
    }
    return [apiUrl(String(input)), init];
  } catch {
    return [apiUrl(String(input)), init];
  }
}

/** Совместимый с fetch враппер, который всегда бьёт по абсолютному URL */
export function apiFetch(input: any, init?: RequestInit) {
  const [req, opts] = toAbs(input, init);
  return fetch(req as any, opts as any);
}

export async function getJSON<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = apiUrl(path);
  const r = await fetch(url, { cache: "no-store", ...(init||{}), next: { revalidate: 0 } as any });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  return r.json();
}

export async function postJSON<T = any>(path: string, body?: any, init?: RequestInit): Promise<T> {
  const url = apiUrl(path);
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers||{}) },
    body: body != null ? JSON.stringify(body) : undefined,
    ...(init||{}),
  });
  if (!r.ok) throw new Error(`POST ${url} -> ${r.status}`);
  return r.json();
}
