import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { makeEncrypt, makeDecrypt } from "./crypto";
const ROOT = path.resolve(process.cwd(), "storage/hbx");
type Meta = {
  id: string; userId: string; filename: string; mime: string;
  size: number; encSize: number; iv: string; tag: string;
  tags?: string[]; createdAt: string;
};
function dirForUser(userId: string) { return path.join(ROOT, userId); }
function filePaths(userId: string, id: string) {
  const dir = dirForUser(userId);
  return { enc: path.join(dir, `${id}.enc`), meta: path.join(dir, `${id}.meta.json`) };
}
export async function ensureDirs(userId: string) { await fsp.mkdir(dirForUser(userId), { recursive: true }); }
export async function saveEncrypted(opts: { userId:string; id:string; filename:string; mime:string; tags?:string[]; source: NodeJS.ReadableStream; size:number; }) {
  const { userId, id, filename, mime, source, size, tags } = opts;
  await ensureDirs(userId);
  const { enc, meta } = filePaths(userId, id);
  const { cipher, iv } = makeEncrypt();
  const out = fs.createWriteStream(enc);
  await pipeline(source, cipher, out);
  const encSize = (await fsp.stat(enc)).size;
  const tag = (cipher as any).getAuthTag();
  const m: Meta = { id, userId, filename, mime, tags, size, encSize, iv: iv.toString("base64"), tag: tag.toString("base64"), createdAt: new Date().toISOString() };
  await fsp.writeFile(meta, JSON.stringify(m, null, 2));
  return m;
}
export async function loadMeta(userId: string, id: string): Promise<Meta | null> {
  const { meta } = filePaths(userId, id);
  try { return JSON.parse(await fsp.readFile(meta, "utf8")); } catch { return null; }
}
export async function listMetas(userId: string, limit = 200): Promise<Meta[]> {
  try {
    const dir = dirForUser(userId);
    const files = await fsp.readdir(dir);
    const metas = files.filter(f => f.endsWith(".meta.json"));
    const out: Meta[] = [];
    for (const m of metas) out.push(JSON.parse(await fsp.readFile(path.join(dir, m), "utf8")));
    out.sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
    return out.slice(0, limit);
  } catch { return []; }
}
export async function streamDecrypted(userId: string, id: string, res: NodeJS.WritableStream) {
  const meta = await loadMeta(userId, id);
  if (!meta) throw new Error("not_found");
  const { enc } = filePaths(userId, id);
  const iv = Buffer.from(meta.iv, "base64");
  const tag = Buffer.from(meta.tag, "base64");
  const file = fs.createReadStream(enc);
  const { decipher } = makeDecrypt(iv, tag);
  await pipeline(file, decipher, res as any);
}
export async function deleteFile(userId: string, id: string) {
  const { enc, meta } = filePaths(userId, id);
  await Promise.allSettled([fsp.unlink(enc), fsp.unlink(meta)]);
}
export type Usage = { bytes: number; files: number };
export async function usage(userId: string): Promise<Usage> {
  const metas = await listMetas(userId);
  let bytes = 0; for (const m of metas) bytes += m.size;
  return { bytes, files: metas.length };
}
