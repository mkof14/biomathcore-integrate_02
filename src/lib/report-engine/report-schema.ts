/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export type InsightKind = "risk" | "trend" | "recommendation";
export type Report = {
  id: string;
  userId: string;
  createdAt: string;
  title: string;
  scope: {
    includeQuestionnaires: string[];
    includeDevices: boolean;
    includeLabs: boolean;
    includeSexualHealth: boolean;
  };
  insights: Array<{ kind: InsightKind; label: string; detail: string }>;
  metrics: Record<string, unknown>;
  sections: Array<{ id: string; title: string; html: string }>;
};
