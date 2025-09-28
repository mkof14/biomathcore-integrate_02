import { getBaseUrl } from './baseUrl';

export function apiUrl(path: string) {
  if (path.startsWith('http')) return path;
  const base = getBaseUrl().replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(apiUrl(path), init);
}
