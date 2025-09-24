import { PrismaClient } from "@prisma/client";

type GlobalWithPrisma = typeof globalThis & { __prisma?: PrismaClient };

let prisma: PrismaClient | undefined;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const g = globalThis as GlobalWithPrisma;
  if (!g.__prisma) g.__prisma = new PrismaClient();
  prisma = g.__prisma;
}

export function getPrisma(): PrismaClient {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}
