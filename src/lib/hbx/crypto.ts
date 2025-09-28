import crypto from "node:crypto";
import { Transform, pipeline } from "node:stream";
import { promisify } from "node:util";
const pipe = promisify(pipeline);
function getKey(): Buffer {
  const b64 = process.env.HBX_MASTER_KEY;
  if (!b64) throw new Error("HBX_MASTER_KEY is required");
  const key = Buffer.from(b64, "base64");
  if (key.length !== 32) throw new Error("HBX_MASTER_KEY must be 32 bytes (base64)");
  return key;
}
export function makeEncrypt(iv?: Buffer) {
  const key = getKey();
  const _iv = iv ?? crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, _iv);
  return { cipher, iv: _iv };
}
export function makeDecrypt(iv: Buffer, authTag: Buffer) {
  const key = getKey();
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  return { decipher };
}
export async function hashSha256(stream: NodeJS.ReadableStream): Promise<string> {
  const h = crypto.createHash("sha256");
  await pipe(stream as any, h as unknown as Transform);
  return h.digest("hex");
}
