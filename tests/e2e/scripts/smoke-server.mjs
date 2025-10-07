import http from "http";
import { randomUUID } from "crypto";

const PORT = Number(process.env.PORT || 3000);

const jobs = new Map();

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "content-type": "application/json", "content-length": Buffer.byteLength(body) });
  res.end(body);
}

function ok(res, data={}) { json(res, 200, { ok: true, ...data }); }
function bad(res, code, msg) { json(res, code, { ok: false, error: msg }); }

function parseBody(req){
  return new Promise((resolve)=>{
    let d=""; req.on("data",c=>d+=c); req.on("end",()=>{ try{ resolve(JSON.parse(d||"{}")); }catch{ resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/health" && req.method === "GET") { return ok(res, { status: "ok" }); }
  if (url.pathname === "/api/status" && req.method === "GET") { return ok(res, { up: true }); }

  if (url.pathname === "/api/reports/generate" && req.method === "POST") {
    const body = await parseBody(req);
    const id = randomUUID();
    return ok(res, { id });
  }

  if (url.pathname === "/api/reports/pdf" && req.method === "POST") {
    const id = randomUUID();
    res.writeHead(200, { "content-type": "application/pdf", "content-disposition": `inline; filename="mock.pdf"` });
    return res.end(Buffer.from(`%PDF-1.4\n% mock ${id}\n`));
  }

  if (url.pathname === "/api/blackbox") {
    if (req.method === "POST") {
      const body = await parseBody(req);
      const id = `job_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      const kind = body?.data?.kind ?? body?.kind ?? "demo";
      const payload = body?.data?.payload ?? body?.payload ?? {};
      jobs.set(id, { id, kind, status: "queued", payload, createdAt: Date.now() });
      return ok(res, { job: jobs.get(id) });
    }
    if (req.method === "GET") {
      const id = url.searchParams.get("id");
      const clear = url.searchParams.get("clear");
      if (clear) { jobs.clear(); return ok(res, { cleared: true }); }
      if (!id) return ok(res, { jobs: Array.from(jobs.values()) });
      const j = jobs.get(id); if (!j) return bad(res, 404, "not_found");
      return ok(res, { job: j });
    }
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      const all = url.searchParams.get("all");
      if (all || (!id && url.searchParams.get("clear"))) { jobs.clear(); return ok(res, { cleared: true }); }
      if (!id) return bad(res, 400, "id required");
      const j = jobs.get(id); if (!j) return bad(res, 404, "not_found");
      j.status = "cancelled"; jobs.set(id, j); return ok(res, { job: j });
    }
  }

  return bad(res, 404, "not_found");
});

server.listen(PORT, () => { console.log(`SMOKE SERVER :${PORT}`); });
