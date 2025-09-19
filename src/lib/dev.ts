/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export function isDevMock(req: Request) {
  if (process.env.NODE_ENV !== "production") return true;
  const hdr = req.headers.get("x-dev");
  if (hdr === "1" || hdr === "true") return true;
  return false;
}
