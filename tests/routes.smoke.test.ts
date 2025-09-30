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
(async () => {
  for (const r of routes) {
    try {
      const res = await fetch(BASE + r, { redirect: "manual" });
      console.log(`${r} -> ${res.status}`);
    } catch (e) {
      console.error(`${r} -> ERROR`, e instanceof Error ? e.message : e);
    }
  }
})();
