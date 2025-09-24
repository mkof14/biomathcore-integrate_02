import HealthBlackBox from "@/components/health/HealthBlackBox";

async function getUsage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blackbox/usage`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function MemberDashboardPage() {
  const usage = await getUsage();
  const props = usage ? {
    usedBytes: usage.totalBytes,
    files: usage.files,
    quotaBytes: usage.quotaBytes,
    userId: usage.userId,
    lastBackup: usage.lastBackup,
    anomaly: usage.anomaly,
    encrypted: usage.encrypted,
    // Добавь картинку, если есть ассет:
    // imageUrl: "/images/blackbox.png",
  } : {};

  return (
    <div className="p-6 space-y-6">
      <HealthBlackBox {...props} />
    </div>
  );
}
