export function toChunks(text: string, chunkSize = 1200, overlap = 150) {
  const words = text.split(/\s+/);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const slice = words.slice(i, i + chunkSize).join(" ");
    if (slice.trim().length) out.push(slice);
  }
  return out;
}
