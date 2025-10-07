import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Job = {
  id: string;
  kind: string;
  status: "queued" | "running" | "done" | "cancelled";
  payload?: any;
  createdAt: number;
};

const store: { jobs: Map<string, Job> } =
  (global as any).__blackbox_store__ || ((global as any).__blackbox_store__ = { jobs: new Map() });

function ok(data: any = {}) {
  return NextResponse.json({ ok: true, ...data });
}
function bad(error: any, code = 400) {
  return NextResponse.json({ ok: false, error: String(error) }, { status: code });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const kind = body?.data?.kind ?? body?.kind ?? "demo";
    const payload = body?.data?.payload ?? body?.payload ?? {};
    if (!kind || typeof kind !== "string") return bad("kind required");
    const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const job: Job = { id, kind, status: "queued", payload, createdAt: Date.now() };
    store.jobs.set(id, job);
    return ok({ job });
  } catch (e: any) {
    return bad(e?.message ?? e, 500);
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const clear = url.searchParams.get("clear");
  const id = url.searchParams.get("id");

  if (clear) {
    store.jobs.clear();
    return ok({ cleared: true });
  }

  if (!id) return ok({ jobs: Array.from(store.jobs.values()) });
  const job = store.jobs.get(id);
  if (!job) return bad("not_found", 404);
  return ok({ job });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const all = url.searchParams.get("all");

  if (all || (!id && url.searchParams.get("clear"))) {
    store.jobs.clear();
    return ok({ cleared: true });
  }

  if (!id) return bad("id required");
  const job = store.jobs.get(id);
  if (!job) return bad("not_found", 404);
  job.status = "cancelled";
  store.jobs.set(id, job);
  return ok({ job });
}
