import PromoDualAI from "@/app/_components/PromoDualAI";
import HomeAdsBand from "@/app/_components/HomeAdsBand";
import Link from "next/link";
import { CATEGORIES } from "./services/services.catalog";
import { CategoryTitle } from "@/app/_components/CategoryVisual";
import StatsStrip from "@/app/_components/StatsStrip";
import HomeCategories from "@/app/_components/HomeCategories";
import OurAdvantages from "@/app/_components/OurAdvantages";
import HowItWorks from "@/app/_components/HowItWorks";
import TrustSecurity from "@/app/_components/TrustSecurity";
import CtaFooter from "@/app/_components/CtaFooter";
import Image from "next/image";

export default function HomePage() {
  const servicesCount = CATEGORIES.reduce((n, c) => n + c.services.length, 0);
  return (
    <main className="px-6  md: max-w-6xl mx-auto  md: py-4 md:py-6">
  <div className="flex justify-center mt-0 mb-6">
    <Image src="/images/BioMath-Logo-22.png" alt="BioMath Core" width={200} height={70} />
  </div>
  <div className="flex items-start mb-6">
    <Image src="/images/BioMath-Logo-22.png" alt="BioMath Core Logo" width={180} height={60}  style={{marginTop:"-40px"}}/>
  </div>
      
<div className="text-center mb-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          BioMath Core
        </h1>
        <p className="mt-1 text-lg text-white/90">
          Evidence-first wellness & longevity tools — {servicesCount}+ services across {CATEGORIES.length} categories.
        </p>
      </div>
<HomeCategories />
  <HowItWorks />
  <TrustSecurity />
  <CtaFooter /><div className="mt-8">
        <HomeAdsBand />
      </div>

      <div className="mt-8">
        <StatsStrip />
      </div>
      <OurAdvantages />
</main>
  );
}
