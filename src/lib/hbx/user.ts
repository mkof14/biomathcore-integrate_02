export function resolveUserId(headers?: Headers, url?: URL): string {
  const fromHeader = headers?.get("X-Demo-User");
  if (fromHeader) return fromHeader;
  const fromQuery = url?.searchParams.get("userId");
  if (fromQuery) return fromQuery;
  return "U1001";
}
