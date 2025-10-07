/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export const STORAGE_KEY = "bmc.catalog.selected";

export function loadSelected(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveSelected(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    // Notify other tabs/pages and listeners
    window.dispatchEvent(new Event("bmc-catalog-changed"));
  } catch {
    /* TODO: implement or remove */
  }
}
