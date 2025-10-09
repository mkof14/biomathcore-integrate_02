import Image from "@/shims/NoImage";
import BackButton from "@/components/ui/BackButton";
import ReportsAllSections from "./ReportsAllSections";

export default function ReportsPage() {
  return (
    <main className="p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center gap-4">
        <BackButton href="/member" />
        <Image
          src="/images/BMCore-34.png"
          alt="BioMath Core"
          width={200}
          height={80}
          className="h-[100px] w-auto drop-shadow-md"
          priority
        />
      </div>

      <ReportsAllSections />
    </main>
  );
}
