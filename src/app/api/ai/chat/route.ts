/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export const runtime = "nodejs";
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({
    /* TODO: implement or remove */
  }));
  const last = Array.isArray(body?.messages)
    ? (body.messages.slice(-1)[0]?.content ?? "")
    : "";
  const answer = last
    ? `Echo: ${String(last).slice(0, 400)}`
    : "Hello from AI mock.";
  return new Response(JSON.stringify({ ok: true, reply: answer }), {
    headers: { "Content-Type": "application/json" },
  });
}
