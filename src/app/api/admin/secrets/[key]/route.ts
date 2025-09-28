/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type SecretsMap = Record<string, unknown>;

async function loadSecrets(): Promise<SecretsMap> {
  const p = path.join(process.cwd(), "var", "secrets.json");
  try {
    const txt = await fs.readFile(p, "utf8");
    const parsed = JSON.parse(txt);
    if (parsed && typeof parsed === "object") {
      if (Array.isArray((parsed as unknown).records)) {
        const map: SecretsMap = { /* TODO: implement or remove */ };
        for (const r of (parsed as unknown).records) {
          if (r && typeof r.key === "string") map[r.key] = r.value;
        }
        return map;
      }
      return parsed as SecretsMap;
    }
  } catch { /* TODO: implement or remove */ }
  return { /* TODO: implement or remove */ };
}

/** GET /api/admin/secrets/:key */
export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const parts = pathname.split("/").filter(Boolean);
  const apiIdx = parts.findIndex((p) => p === "api");
  const base = apiIdx >= 0 ? parts.slice(apiIdx + 1) : parts; // ["admin","secrets","<key>"]
  const idx = base.findIndex((p) => p === "secrets");
  const key = idx >= 0 ? base[idx + 1] : undefined;

  if (!key) {
    return NextResponse.json({ ok: true, hint: "Use /api/admin/secrets/<key>" });
  }

  const secrets = await loadSecrets();
  if (Object.prototype.hasOwnProperty.call(secrets, key)) {
    return NextResponse.json({ key, value: (secrets as unknown)[key] });
  }
  return NextResponse.json({ error: "Secret not found", key }, { status: 404 });
}
