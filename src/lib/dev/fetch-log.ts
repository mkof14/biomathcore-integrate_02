/**
 * Серверный перехватчик fetch для диагностики и автопрефиксации относительных URL.
 * Отключается переменной DISABLE_FETCH_LOG=1
 */
if (!process.env.DISABLE_FETCH_LOG) {
  // Подтягиваем baseUrl только на сервере
  let getBase: (() => string) | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getBaseUrl } = require("@/lib/baseUrl");
    getBase = getBaseUrl;
  } catch {}

  const orig = globalThis.fetch;
  // @ts-ignore
  globalThis.fetch = async function (input: any, init?: RequestInit) {
    const toStr = (x: any) =>
      typeof x === "string" ? x : (x?.url ?? String(x));
    let url = toStr(input);
    const method =
      init?.method || (typeof input !== "string" && input?.method) || "GET";

    // Если относительный путь — префиксуем базовым URL (только на сервере)
    if (typeof window === "undefined" && url && !/^https?:\/\//i.test(url)) {
      const base =
        (getBase && getBase()) ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        `http://localhost:${process.env.PORT || "3000"}`;
      if (!url.startsWith("/")) url = "/" + url;
      input = base.replace(/\/+$/, "") + url;
    }

    const t0 = Date.now();
    try {
      const res = await orig(input as any, init);
      const ms = Date.now() - t0;
      console.log(`[FETCH ${res.status}] ${method} ${toStr(input)} (${ms}ms)`);
      return res;
    } catch (e: any) {
      const ms = Date.now() - t0;
      console.error(
        `[FETCH ERROR] ${method} ${toStr(input)} (${ms}ms)`,
        e?.code ? `code=${e.code}` : "",
        e?.message || e,
      );
      throw e;
    }
  };
}
