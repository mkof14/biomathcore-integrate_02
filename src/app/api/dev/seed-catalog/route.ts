import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const categories = [
  { slug: "critical-health",        title: "Critical Health",                 price: 7 },
  { slug: "everyday-wellness",      title: "Everyday Wellness",               price: 5 },
  { slug: "longevity-anti-aging",   title: "Longevity & Anti-Aging",          price: 6 },
  { slug: "mental-wellness",        title: "Mental Wellness",                 price: 5 },
  { slug: "fitness-performance",    title: "Fitness & Performance",           price: 6 },
  { slug: "women-health",           title: "Women’s Health",                  price: 6 },
  { slug: "men-health",             title: "Men’s Health",                    price: 6 },
  { slug: "beauty-skincare",        title: "Beauty & Skincare",               price: 4 },
  { slug: "nutrition-diet",         title: "Nutrition & Diet",                price: 5 },
  { slug: "sleep-recovery",         title: "Sleep & Recovery",                price: 5 },
  { slug: "environmental-health",   title: "Environmental Health",            price: 4 },
  { slug: "family-health",          title: "Family Health",                   price: 5 },
  { slug: "preventive-longevity",   title: "Preventive Medicine & Longevity", price: 7 },
  { slug: "biohacking-performance", title: "Biohacking & Performance",        price: 6 },
  { slug: "senior-care",            title: "Senior Care",                     price: 5 },
  { slug: "eye-health-suite",       title: "Eye-Health Suite",                price: 4 },
  { slug: "digital-therapeutics",   title: "Digital Therapeutics Store",      price: 6 },
  { slug: "general-sexual",         title: "General Sexual Longevity",        price: 6 },
  { slug: "men-sexual-health",      title: "Men's Sexual Health",             price: 6 },
  { slug: "women-sexual-health",    title: "Women's Sexual Health",           price: 6 },
];

export async function POST() {
  for (const [i, c] of categories.entries()) {
    await prisma.catalog.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        title: c.title,
        description: `${c.title} services`,
        price: c.price,
        priority: i + 1,
        status: "ACTIVE",
      },
      update: {
        title: c.title,
        price: c.price,
        priority: i + 1,
        status: "ACTIVE",
      },
    });
  }
  return NextResponse.json({ ok: true, inserted: categories.length });
}

export async function GET() {
  const count = await prisma.catalog.count();
  return NextResponse.json({ count });
}
