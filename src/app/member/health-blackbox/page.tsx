import HealthBlackBox from "@/components/health/HealthBlackBox";
import FilesPanel from "@/components/health/FilesPanel";

export default async function HealthBlackBoxPage() {
  return (
    <div className="p-6 space-y-6">
      <HealthBlackBox
        imageUrl="/images/health_black_box_1.jpg"
        usedBytes={0}
        files={2}
        quotaBytes={2 * 1024 * 1024 * 1024}
        userId="U1001"
        lastBackup="—"
        anomaly={true}
        encrypted={true}
      />
      <FilesPanel userId="U1001" />
    </div>
  );
}
