import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const results = searchCatalog(q, 20).map((r) => ({
    type: r.type,
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    url: r.url,
  }));
  return NextResponse.json({ query: q, count: results.length, results });
}
