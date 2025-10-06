/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export function assertAuth(session: { user?: { email?: string } } | null) {
  if (!session?.user?.email) {
    const err = new Error("UNAUTHORIZED");
    (err as unknown).status = 401;
    throw err;
  }
}
