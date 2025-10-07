import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";
const prisma = new PrismaClient();
export async function audit(event: string, meta: Record<string, any> = {}) {
  try {
    await prisma.auditLog.create({ data: { event, metaJson: JSON.stringify(meta).slice(0, 65000) } });
  } catch (e) {
    logger.warn({ e }, "audit_failed");
  }
}
