import http from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || "127.0.0.1";

const jobs = new Map();

function send(res, code, obj, extraHeaders={}) {
  const body = typeof obj === "string" ? obj : JSON.stringify(obj);
  res.writeHead(code, { "content-type": typeof obj === "string" ? "text/plain" : "application/json", "content-length": Buffer.byteLength(body), ...extraHeaders });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/" && req.method === "GET") return send(res, 200, { ok: true, status: "root-ok" });
  if (url.pathname === "/api/health" && req.method === "GET") return send(res, 200, { ok: true, status: "ok" });
  if (url.pathname === "/api/status" && req.method === "GET") return send(res, 200, { ok: true, up: true });

  if (url.pathname === "/api/reports/generate" && req.method === "POST") {
    return send(res, 200, { ok: true, id: randomUUID() });
  }

  if (url.pathname === "/api/reports/pdf" && req.method === "POST") {
    const content = `%PDF-1.4\n% mock\n1 0 obj <<>> endobj\ntrailer <<>>\n%%EOF\n`;
    return send(res, 200, content, { "content-type": "application/pdf", "content-disposition": `inline; filename="mock.pdf"` });
  }

  if (url.pathname === "/api/blackbox/jobs") {
    if (req.method === "POST") {
      const bufs=[]; for await (const c of req) bufs.push(c); const body=Buffer.concat(bufs).toString();
      let data={}; try{ data=JSON.parse(body||"{}"); }catch{}
      const id = `job_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      const job = { id, kind: data?.kind ?? "demo", status: "queued", payload: data?.payload ?? {}, createdAt: Date.now() };
      jobs.set(id, job);
      return send(res, 200, { ok: true, job });
    }
    if (req.method === "GET") {
      const id = url.searchParams.get("id");
      if (!id) return send(res, 200, { ok: true, jobs: Array.from(jobs.values()) });
      const j = jobs.get(id); if (!j) return send(res, 404, { ok: false, error: "not_found" });
      return send(res, 200, { ok: true, job: j });
    }
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      const clear = url.searchParams.get("clear");
      if (clear === "true" || (!id && clear !== null)) { jobs.clear(); return send(res, 200, { ok: true, cleared: true }); }
      if (!id) return send(res, 400, { ok: false, error: "id required" });
      const j = jobs.get(id); if (!j) return send(res, 404, { ok: false, error: "not_found" });
      j.status = "cancelled"; jobs.set(id, j);
      return send(res, 200, { ok: true, job: j });
    }
  }

  return send(res, 404, { ok: false, error: "not_found" });
});

server.listen(PORT, HOST, () => { console.log(`SMOKE SERVER ${HOST}:${PORT}`); });
