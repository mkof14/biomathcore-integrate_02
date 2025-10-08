import http from "node:http";
import { randomUUID } from "node:crypto";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3010);

const jobs = new Map();
const reports = new Map();
const startedAt = Date.now();

function send(res, code, body, headers = {}) {
  const h = { "Content-Type": "application/json", ...headers };
  res.writeHead(code, h);
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) return send(res, 400, { ok:false, error:"no_url" });
    const { method } = req;
    const url = new URL(req.url, `http://${HOST}:${PORT}`);
    const path = url.pathname;

    // Root & health
    if (method === "GET" && path === "/") return send(res, 200, { ok: true, status: "root-ok" });
    if (method === "GET" && path === "/api/health") return send(res, 200, { ok: true, status: "ok" });
    if (method === "GET" && path === "/api/status") {
      return send(res, 200, { ok: true, up: true, uptime: Date.now() - startedAt });
    }

    // Blackbox jobs
    if (path === "/api/blackbox/jobs" && method === "POST") {
      let data = ""; for await (const chunk of req) data += chunk; const body = data ? JSON.parse(data) : {};
      const id = randomUUID();
      const job = { id, status: "queued", createdAt: new Date().toISOString(), body };
      jobs.set(id, job);
      return send(res, 201, { ok: true, job });
    }
    if (path.startsWith("/api/blackbox/jobs/")) {
      const seg = path.split("/").filter(Boolean);
      const trueId = seg[3];
      const isCancel = seg[4] === "cancel";
      if (method === "GET" && seg.length === 4) {
        const j = jobs.get(trueId); if (!j) return send(res, 404, { ok:false, error:"not_found" });
        return send(res, 200, { ok:true, job:j });
      }
      if (method === "DELETE" && seg.length === 4) {
        const j = jobs.get(trueId); if (!j) return send(res, 404, { ok:false, error:"not_found" });
        j.status = "cancelled"; jobs.set(trueId, j);
        return send(res, 200, { ok:true, job:j });
      }
      if (method === "POST" && isCancel) {
        const j = jobs.get(trueId); if (!j) return send(res, 404, { ok:false, error:"not_found" });
        j.status = "cancelled"; jobs.set(trueId, j);
        return send(res, 200, { ok:true, job:j });
      }
    }
    if (path === "/api/blackbox/jobs/clear" && method === "POST") {
      jobs.clear(); return send(res, 200, { ok:true, cleared:true });
    }

    // Reports mock
    if (path === "/api/reports/generate" && method === "POST") {
      let data = ""; for await (const chunk of req) data += chunk; const body = data ? JSON.parse(data) : {};
      const id = randomUUID();
      const rep = { id, createdAt: new Date().toISOString(), ...body };
      reports.set(id, rep);
      return send(res, 201, { ok:true, id, report: rep });
    }
    if (path.startsWith("/api/reports/") && method === "GET") {
      const id = path.split("/").pop();
      const rep = reports.get(id);
      if (!rep) return send(res, 404, { ok:false, error:"not_found" });
      return send(res, 200, { ok:true, report: rep });
    }
    if (path === "/api/reports/pdf" && method === "POST") {
      const pdf = "%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n";
      return send(res, 200, pdf, { "Content-Type": "application/pdf" });
    }

    return send(res, 404, { ok:false, error:"not_found" });
  } catch (e) {
    return send(res, 500, { ok:false, error:"server_error", detail:String(e?.message||e) });
  }
});

server.headersTimeout = 65000;
server.requestTimeout = 30000;

const shutdown = () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1000).unref();
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

server.listen(PORT, HOST, () => {
  console.log(`SMOKE SERVER ${HOST}:${PORT}`);
});
