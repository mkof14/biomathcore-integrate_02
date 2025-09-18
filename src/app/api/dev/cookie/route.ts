/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export const runtime = "nodejs";
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({ /* TODO: implement or remove */ }));
  const userId = (typeof body?.userId === "string" && body.userId.trim()) || "dev-user-001";
  const payload = JSON.stringify({ ok:true, userId });
  return new Response(payload, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `bmc_dev_user=${encodeURIComponent(userId)}; Path=/; Max-Age=${60*60*24*7}; SameSite=Lax`,
    },
  });
}
