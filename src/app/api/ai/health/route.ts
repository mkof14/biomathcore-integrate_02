/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export const runtime = "nodejs";
export async function GET() {
  return Response.json({ ok: true, service: "ai" });
}
