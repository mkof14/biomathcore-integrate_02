/**
 * Простое скользящее окно (in-memory).
 * Не для многоинстансового продакшена (нужен Redis), но отлично под dev/staging.
 */
type Key = string;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number; // через сколько миллисекунд окно точно сдвинется
};

type Bucket = {
  hits: number[];
};

const store = new Map<Key, Bucket>();

export function rateLimit(
  key: Key,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;
  let b = store.get(key);
  if (!b) {
    b = { hits: [] };
    store.set(key, b);
  }
  // чистим старые события
  b.hits = b.hits.filter((t) => t > cutoff);
  // проверяем лимит
  if (b.hits.length >= max) {
    const oldest = b.hits[0]!;
    const resetMs = Math.max(0, oldest + windowMs - now);
    return { ok: false, remaining: 0, resetMs };
  }
  // записываем хит и ок
  b.hits.push(now);
  const remaining = Math.max(0, max - b.hits.length);
  const oldest = b.hits[0]!;
  const resetMs = Math.max(0, oldest + windowMs - now);
  return { ok: true, remaining, resetMs };
}
