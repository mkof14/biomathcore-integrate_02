import dotenvSafe from "dotenv-safe";
import path from "path";

dotenvSafe.config({
  example: path.resolve(process.cwd(), ".env.example"),
  allowEmptyValues: false,
});

export function requiredEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env: ${key}`);
  return val;
}
