/** Server helper: resolves current member plan.
 * In production, replace with DB lookup by user.
 */
export async function resolvePlanForRequest(): Promise<
  "STANDARD" | "PREMIUM" | "MAX"
> {
  // TODO: plug into session/DB. Fallback to PREMIUM to reveal full base stack + premium modules.
  return "PREMIUM";
}
