import type { Report } from "./report-schema";
import { generateReport } from "./generate";

const mem: Report[] = [];
let seeded = false;

async function ensureSeed() {
  if (seeded || mem.length > 0) return;
  seeded = true;
  try {
    const r1 = await generateReport("U1001", {
      includeQuestionnaires: ["patient"],
      includeDevices: true,
      includeLabs: true,
      includeSexualHealth: false
    });
    const r2 = await generateReport("U1001", {
      includeQuestionnaires: ["patient","lifestyle","medical-history"],
      includeDevices: false,
      includeLabs: true,
      includeSexualHealth: true
    });
    mem.unshift(r2, r1);
  } catch (e) {
    // swallow seed errors in dev
  }
}
ensureSeed();

export function saveReport(r: Report) {
  const i = mem.findIndex(x => x.id === r.id);
  if (i >= 0) mem[i] = r; else mem.unshift(r);
}
export function getReport(id: string): Report | undefined { return mem.find(r => r.id === id); }
export function listReports(userId: string): Report[] { return mem.filter(r => r.userId === userId); }
