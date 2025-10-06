"use client";
export type AnalyticsPayload = {
  type:
    | "category_click"
    | "service_click"
    | "favorite_toggle"
    | "search_submit"
    | "search_reset"
    | "tag_toggle"
    | "tags_clear"
    | "sort_change"
    | "mobile_drawer_open"
    | "mobile_drawer_close";
  meta?: Record<string, unknown>;
};
export function useAnalyticsEvent() {
  function track(payload: AnalyticsPayload) {
    try {
      // lightweight console trace for now
      // eslint-disable-next-line no-console
      console.log("[analytics]", payload);
      // emit a DOM event for future integrations
      window.dispatchEvent(
        new CustomEvent("bmcore:analytics", { detail: payload }),
      );
      // optional beacon stub (wire later to a real endpoint)
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ ...payload, ts: Date.now() })],
          { type: "application/json" },
        );
        navigator.sendBeacon("/api/analytics", blob);
      }
    } catch {}
  }
  return { track };
}
