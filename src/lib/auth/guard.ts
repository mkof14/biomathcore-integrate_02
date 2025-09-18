export function assertAuth(session: { user?: { email?: string } } | null) {
  if (!session?.user?.email) {
    const err = new Error('UNAUTHORIZED');
    (err as any).status = 401;
    throw err;
  }
}
