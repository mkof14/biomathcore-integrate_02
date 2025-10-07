type SecretValue = string;
const mem = new Map<string, SecretValue>();

export async function putSecret(
  key: string,
  value: SecretValue,
): Promise<void> {
  mem.set(key, value);
}
export async function getSecret(key: string): Promise<SecretValue | null> {
  return mem.has(key) ? (mem.get(key) as SecretValue) : null;
}
export async function listSecrets(): Promise<{ key: string }[]> {
  return Array.from(mem.keys()).map((k) => ({ key: k }));
}
export async function removeSecret(key: string): Promise<void> {
  mem.delete(key);
}
