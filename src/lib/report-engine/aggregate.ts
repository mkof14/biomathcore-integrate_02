/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
// Self-contained aggregate without external imports

export type Answers = Record<string, any>;

export type AggregatedData = {
  userId: string;
  profile: { anonReports: boolean; units: "metric"|"imperial" };
  questionnaires: Record<string, Answers>;
  devices: { steps?: number[]; hr?: number[] };
  labs: Record<string, number>;
  sexualHealthAllowed: boolean;
};

// ---- In-memory demo stores (so build doesn't depend on other modules) ----
const QDB: Record<string, Record<string, Answers>> = {
  U1001: {
    patient: { height_cm: 178, weight_kg: 86 },
    lifestyle: { smoking: false, alcohol: 3, activity: 180, sleep: 7 },
    "medical-history": { diabetes: false, hypertension: false },
    "sexual-health-male": {
      nocturnal_erections_change: "decreased",
      sexual_thoughts_change: "decreased",
      intercourse_frequency_change: "decreased",
      muscle_mass_change: "decreased",
      hair_presence_change: "no_change",
      hair_density_change: "no_change"
    }
  }
};
function getAnswers(userId: string, slug: string): Answers|undefined {
  return QDB[userId]?.[slug];
}

function genSeries(n=14, base=7500) {
  const steps:number[] = Array.from({length:n}, ()=>Math.max(1000, Math.round(base + (Math.random()-0.5)*3000)));
  const hr:number[] = Array.from({length:n}, ()=>Math.round(60 + Math.random()*30));
  return { steps, hr };
}
const DEVDB: Record<string, { steps:number[]; hr:number[] }> = {
  U1001: genSeries()
};

function getUserDevices(userId: string) {
  const s = DEVDB[userId];
  return { series: s ? s : { steps: [], hr: [] } };
}

const ENT: Record<string, Record<string, boolean>> = { U1001: { sexual_health: true } };
function hasEntitlement(userId: string, key: string) {
  return !!ENT[userId]?.[key];
}

type Profile = { units: "metric"|"imperial"; anonReports: boolean; displayName?: string };
const PROFILES: Record<string, Profile> = { U1001: { units: "metric", anonReports: true, displayName: "User U1001" } };
function getProfile(userId: string): Profile {
  return PROFILES[userId] || { units: "metric", anonReports: false };
}

// ---- Aggregator ----
export async function aggregateUserData(userId: string, scope: {
  includeQuestionnaires: string[];
  includeDevices: boolean;
  includeLabs: boolean;
  includeSexualHealth: boolean;
}): Promise<AggregatedData> {
  const prof = getProfile(userId);
  const profile = { anonReports: !!prof.anonReports, units: prof.units };

  const questionnaires: Record<string, Answers> = { /* TODO: implement or remove */ };
  for (const q of scope.includeQuestionnaires) {
    questionnaires[q] = getAnswers(userId, q) ?? { /* TODO: implement or remove */ };
  }

  const devices = scope.includeDevices ? (()=>{ const d = getUserDevices(userId); return d.series; })() : { /* TODO: implement or remove */ };
  const labs = scope.includeLabs ? { A1C: +(5.2 + Math.random()*1.2).toFixed(1), LDL: 90+Math.round(Math.random()*60) } : { /* TODO: implement or remove */ };
  const sexualHealthAllowed = scope.includeSexualHealth && hasEntitlement(userId, "sexual_health");

  return { userId, profile, questionnaires, devices, labs, sexualHealthAllowed };
}
