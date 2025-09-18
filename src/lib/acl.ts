export type SessionLike = { user?: { role?: string } } | null;

export function isAdmin(session: SessionLike) {
  const role = session?.user?.role?.toLowerCase?.() || "";
  return role === "admin" || role === "owner" || role === "superadmin";
}
