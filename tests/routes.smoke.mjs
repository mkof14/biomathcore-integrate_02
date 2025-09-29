const BASE = process.env.BASE_URL || "http://localhost:3000";
const routes = [
  "/member",
  "/member/dashboard",
  "/member/questionnaires",
  "/member/reports",
  "/member/settings",
  "/member/catalog",
  "/member/connect-devices",
  "/member/health-assistant",
  "/member/health-blackbox",
  "/catalog"
];
const ok = new Set([200, 204, 301, 302, 303, 307, 308]);
let bad = 0;
for (const r of routes) {
  try {
    const res = await fetch(BASE + r, { redirect: "manual" });
    const line = `${r} -> ${res.status}`;
    console.log(line);
    if (!ok.has(res.status)) bad++;
  } catch (e) {
    console.log(`${r} -> ERROR`);
    bad++;
  }
}
process.exit(bad ? 1 : 0);
