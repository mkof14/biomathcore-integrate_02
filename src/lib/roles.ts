/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
export type Role = "SuperAdmin"|"Analyst"|"TechOperator"|"ContentManager"|"Moderator";

export const permissions: Record<Role, string[]> = {
  SuperAdmin: ["view_finance","edit_content","manage_users","monitor_devices","view_analytics","access_settings","view_alerts","monitoring"],
  Analyst: ["view_finance","view_analytics"],
  TechOperator: ["monitor_devices","view_alerts","monitoring"],
  ContentManager: ["edit_content"],
  Moderator: ["manage_users"]
};

export function can(role: Role, perm: string) {
  return role === "SuperAdmin" || permissions[role]?.includes(perm);
}
