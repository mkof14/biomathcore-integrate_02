/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

async function jsonGet(path: string) {
  const host = (await headers()).get("host") || "localhost:3000";
  const url = path.startsWith("http") ? path : `http://${host}${path}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`${path} ${r.status}`);
  return r.json();
}

export async function GET() {
  try {
    const [summary, byDay, health] = await Promise.all([
      jsonGet("/api/analytics/summary").catch(() => ({
        data: {
          /* TODO: implement or remove */
        },
      })),
      jsonGet("/api/analytics/by-day?days=30").catch(() => ({ data: [] })),
      jsonGet("/api/health/all").catch(() => ({
        data: {
          /* TODO: implement or remove */
        },
      })),
    ]);

    const endpoints =
      (health as unknown)?.data ??
      {
        /* TODO: implement or remove */
      };
    const endpointsTotal = Object.keys(endpoints).length;
    const endpointsOk = Object.values(endpoints).filter(
      (x: unknown) => x?.ok,
    ).length;

    return NextResponse.json({
      ok: true,
      data: {
        users: {
          total: null,
          new7d: null,
          dau: null,
          mau: null,
          churn7d: null,
        },
        finance: {
          mrr: null,
          arr: null,
          revenue30d: null,
          revenueYTD: null,
          activeSubs: null,
          churnRate: null,
        },
        tech: {
          endpointsOk,
          endpointsTotal,
          errorRate: null,
          avgLatencyMs: null,
        },
        analytics:
          summary?.data ??
          {
            /* TODO: implement or remove */
          },
        byDay: (byDay as unknown)?.data ?? [],
        endpoints,
      },
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "failed" },
      { status: 500 },
    );
  }
}

export /* TODO: implement or remove */ {};
