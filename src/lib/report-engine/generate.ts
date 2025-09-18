import { aggregateUserData } from "./aggregate";
import type { Report } from "./report-schema";

export async function generateReport(userId: string, scope: Report["scope"]): Promise<Report> {
  const agg = await aggregateUserData(userId, scope);

  const metrics: Record<string, unknown> = {};
  const bmi = computeBMI(agg);
  if (bmi) metrics["BMI"] = bmi.toFixed(1);
  if (agg.devices?.steps) metrics["Avg steps (14d)"] = Math.round(agg.devices.steps.reduce((a,b)=>a+b,0)/agg.devices.steps.length);
  if (agg.labs?.A1C) metrics["A1C"] = agg.labs.A1C;

  const insights = buildInsights(agg, bmi);

  const sections = [
    { id:"overview", title:"Overview", html: `
      <p>Units: <strong>${agg.profile.units}</strong>. ${agg.profile.anonReports ? "Anonymous ID enabled." : "Named mode."}</p>
      <p>Answered questionnaires: ${Object.keys(agg.questionnaires).filter(k=>Object.keys(agg.questionnaires[k]||{}).length>0).join(", ") || "none"}</p>
    ` },
    { id:"devices", title:"Devices", html: agg.devices?.steps ? `
      <p>Steps 14d: ${agg.devices.steps.join(", ")}</p>
      <p>Heart rate 14d: ${agg.devices.hr?.join(", ") || "—"}</p>
    ` : "<p>No device data.</p>" },
    { id:"labs", title:"Labs", html: `
      <p>A1C: ${agg.labs?.A1C ?? "—"}</p>
      <p>LDL: ${agg.labs?.LDL ?? "—"}</p>
    ` },
    ...(agg.sexualHealthAllowed ? [{
      id:"sexual-health",
      title:"Sexual Health",
      html: buildSexualHealthHtml(agg)
    }] : [])
  ];

  const report: Report = {
    id: "R" + Math.random().toString(36).slice(2,10),
    userId: agg.profile.anonReports ? userId : userId,
    createdAt: new Date().toISOString(),
    title: "Personal Health Report",
    scope,
    insights,
    metrics,
    sections
  };
  return report;
}

function computeBMI(agg: any): number|undefined {
  const p = agg.questionnaires?.patient;
  if (!p?.height_cm || !p?.weight_kg) return;
  const h = Number(p.height_cm)/100;
  const w = Number(p.weight_kg);
  return w/(h*h);
}

function buildInsights(agg: any, bmi?: number) {
  const out: Array<{kind:"risk"|"trend"|"recommendation";label:string;detail:string}> = [];
  if (typeof bmi === "number") {
    if (bmi >= 30) out.push({ kind:"risk", label:"High BMI", detail:`BMI ${bmi.toFixed(1)} suggests obesity risk.` });
    else if (bmi >= 25) out.push({ kind:"trend", label:"Overweight", detail:`BMI ${bmi.toFixed(1)} (target 18.5–24.9).` });
    else out.push({ kind:"recommendation", label:"Healthy BMI", detail:`Maintain BMI ${bmi.toFixed(1)} with regular activity.` });
  }
  if (agg.devices?.steps) {
    const avg = Math.round(agg.devices.steps.reduce((a:number,b:number)=>a+b,0)/agg.devices.steps.length);
    if (avg < 6000) out.push({ kind:"recommendation", label:"Increase Activity", detail:`Avg steps ${avg}/day — aim for 8–10k.` });
    else out.push({ kind:"trend", label:"Good Activity", detail:`Avg steps ${avg}/day over the last 14 days.` });
  }
  if (agg.sexualHealthAllowed) {
    const sh = agg.questionnaires["sexual-health-male"] || agg.questionnaires["sexual-health-female"] || agg.questionnaires["sexual-health-general"];
    if (sh && (sh.nocturnal_erections_change==="decreased" || sh.sexual_thoughts_change==="decreased")) {
      out.push({ kind:"risk", label:"Libido/Erectile change", detail:"Reported decrease — consider hormonal panel and lifestyle review." });
    }
  }
  return out;
}

function buildSexualHealthHtml(agg: any) {
  const sh = agg.questionnaires["sexual-health-male"] || agg.questionnaires["sexual-health-female"] || agg.questionnaires["sexual-health-general"] || {};
  const rows = [
    ["Night/Morning erections change", sh.nocturnal_erections_change ?? "—"],
    ["Sexual thoughts/fantasies change", sh.sexual_thoughts_change ?? "—"],
    ["Sexual intercourse frequency change", sh.intercourse_frequency_change ?? "—"],
    ["Muscle mass change", sh.muscle_mass_change ?? "—"],
    ["Hair presence change (legs/hands/breast/back/face)", sh.hair_presence_change ?? "—"],
    ["Hair density change (legs/hands)", sh.hair_density_change ?? "—"],
  ];
  return `<table>
    ${rows.map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td></tr>`).join("")}
  </table>`;
}
