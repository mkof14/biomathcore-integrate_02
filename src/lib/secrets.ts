type SecretValue = string;
const mem = new Map<string, SecretValue>();

export async function putSecret(key: string, value: SecretValue): Promise<void> {
  mem.set(key, value);
}

export async function getSecret(key: string): Promise<SecretValue | null> {
  if (mem.has(key)) return mem.get(key) as SecretValue;
  return process.env[key] ?? null;
}

export async function listSecrets(): Promise<{ key: string }[]> {
  return Array.from(new Set([...mem.keys(), ...Object.keys(process.env)])).map((k) => ({ key: k }));
}

export async function removeSecret(key: string): Promise<void> {
  mem.delete(key);
}
