import http from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || "127.0.0.1";

const jobs = new Map();
const reports = new Map();

function send(res, code, obj, headers = {}) {
  const h = { "Content-Type": "application/json", ...headers };
  res.writeHead(code, h);
  res.end(JSON.stringify(obj));
}
function notFound(res) { return send(res, 404, { ok: false, error: "not_found" }); }
function parseBody(req) {
  return new Promise((resolve) => {
    let data = ""; req.on("data", (c) => (data += c));
    req.on("end", () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/") return send(res, 200, { ok: true, status: "root-ok" });
  if (req.method === "GET" && url.pathname === "/api/health") return send(res, 200, { ok: true, status: "ok" });
  if (req.method === "GET" && url.pathname === "/api/status") return send(res, 200, { ok: true, up: true, uptime: process.uptime() });

  if (req.method === "POST" && url.pathname === "/api/reports/generate") {
    const body = await parseBody(req);
    const id = randomUUID();
    const rep = { id, title: body?.title || "Smoke Report", userId: body?.userId || "u", createdAt: new Date().toISOString(), status: "ready" };
    reports.set(id, rep);
    return send(res, 200, { ok: true, id, report: rep });
  }
  if (req.method === "GET" && /^\/api\/reports\/[^/]+$/.test(url.pathname)) {
    const id = url.pathname.split("/").pop();
    const rep = reports.get(id);
    if (!rep) return notFound(res);
    return send(res, 200, { ok: true, report: rep });
  }
  if (req.method === "POST" && url.pathname === "/api/reports/pdf") {
    const pdf = Buffer.from("%PDF-1.4\n1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj\n2 0 obj <</Type/Pages/Count 1/Kids[3 0 R]>> endobj\n3 0 obj <</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]/Contents 4 0 R>> endobj\n4 0 obj <</Length 44>>stream\nBT /F1 12 Tf 72 120 Td (Smoke OK) Tj ET\nendstream endobj\ntrailer <</Root 1 0 R>>\n%%EOF","utf8");
    res.writeHead(200,{ "Content-Type":"application/pdf","Content-Length":pdf.length }); return res.end(pdf);
  }

  if (url.pathname === "/api/blackbox/jobs" && req.method === "POST") {
    const id = randomUUID(); const job = { id, status: "created", createdAt: new Date().toISOString() };
    jobs.set(id, job); return send(res, 200, { ok: true, job });
  }
  if (/^\/api\/blackbox\/jobs\/[^/]+(\/cancel)?$/.test(url.pathname)) {
    const parts = url.pathname.split("/"); const id = parts[4]; const isCancel = parts[5] === "cancel";
    if (req.method === "GET" && !isCancel) { const j = jobs.get(id); if (!j) return notFound(res); return send(res,200,{ok:true,job:j}); }
    if (req.method === "DELETE" && !isCancel) { const j = jobs.get(id); if (!j) return notFound(res); j.status="cancelled"; jobs.set(id,j); return send(res,200,{ok:true,job:j}); }
    if (req.method === "POST" && isCancel) { const j = jobs.get(id); if (!j) return notFound(res); j.status="cancelled"; jobs.set(id,j); return send(res,200,{ok:true,job:j}); }
  }
  if (url.pathname === "/api/blackbox/jobs/clear" && req.method === "POST") { jobs.clear(); return send(res, 200, { ok: true, cleared: true }); }

  return notFound(res);
});

server.listen(PORT, HOST, () => { console.log(`SMOKE SERVER ${HOST}:${PORT}`); });
