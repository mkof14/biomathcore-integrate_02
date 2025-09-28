export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true, name: true, blurb: true, iconKey: true },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json({ ok: true, categories });
  } catch (e: any) {
    console.error('GET /api/catalog/categories failed:', e);
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 });
  }
}
