import PromoDualAI from "@/app/_components/PromoDualAI";
import HomeAdsBand from "@/app/_components/HomeAdsBand";
import Link from "next/link";
import { CATEGORIES } from "./services/services.catalog";
import { CategoryTitle } from "@/app/_components/CategoryVisual";
import StatsStrip from "@/app/_components/StatsStrip";
import HomeCategories from "@/app/_components/HomeCategories";

export default function HomePage() {
  const servicesCount = CATEGORIES.reduce((n, c) => n + c.services.length, 0);
  return (
    <main className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          BioMath Core
        </h1>
        <p className="mt-2 text-lg text-white/90">
          Evidence-first wellness & longevity tools — {servicesCount}+ services across {CATEGORIES.length} categories.
        </p>
      </div>

      <HomeCategories /><div className="mt-8">
        <HomeAdsBand />
      </div>

      <div className="mt-8">
        <StatsStrip />
      </div>
    </main>
  );
}
