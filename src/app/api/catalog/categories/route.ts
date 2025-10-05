import { NextResponse } from "next/server";
import { CATEGORIES } from "@/lib/service-catalog";

export async function GET() {
  const items = CATEGORIES.map(c => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary ?? "",
    count: (c.services ?? []).length
  }));
  return NextResponse.json({ items });
}
