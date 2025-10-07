import { NextResponse } from "next/server";
import { CATEGORIES } from "@/lib/service-catalog";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category =
    searchParams.get("category") || searchParams.get("categorySlug") || "";
  const cat = CATEGORIES.find((c) => c.slug === category);
  const items = (cat?.services ?? []).map((s) => ({
    slug: s.slug,
    title: s.title,
    summary: s.summary ?? "",
    category: cat?.title,
    categorySlug: cat?.slug,
  }));
  return NextResponse.json({ items });
}
