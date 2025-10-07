export type PlanId = "free" | "plus" | "pro";
export type Limits = { maxBytes: number; maxFiles: number };
export const PLANS: Record<PlanId, Limits> = {
  free: { maxBytes: 200 * 1024 * 1024, maxFiles: 200 },
  plus: { maxBytes: 5 * 1024 * 1024 * 1024, maxFiles: 5000 },
  pro: { maxBytes: 50 * 1024 * 1024 * 1024, maxFiles: 20000 },
};
const g = globalThis as any;
g.__HBX_USER_PLANS ??= new Map<string, PlanId>();
export function getUserPlan(userId: string): PlanId {
  return g.__HBX_USER_PLANS.get(userId) ?? "free";
}
export function setUserPlan(userId: string, plan: PlanId) {
  g.__HBX_USER_PLANS.set(userId, plan);
}
export function getLimits(userId: string): Limits {
  return PLANS[getUserPlan(userId)];
}
