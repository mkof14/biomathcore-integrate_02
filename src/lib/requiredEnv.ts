export function requiredEnv(key: string): string {
  const v = process.env[key];
  if (!v || v.trim() === "") {
    const err = new Error(`Missing required env: ${key}`);
    (err as any).status = 500;
    throw err;
  }
  return v;
}
