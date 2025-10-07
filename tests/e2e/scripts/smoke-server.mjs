import http from "node:http";

const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || "127.0.0.1";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true, status: "root-ok" }));
  }
  if (req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true, status: "ok" }));
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: false, error: "not_found" }));
});

server.listen(PORT, HOST, () => {
  console.log(`SMOKE SERVER ${HOST}:${PORT}`);
});
