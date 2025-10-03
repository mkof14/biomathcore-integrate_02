import prismaDefault, { prisma } from "@/lib/prisma";
export { prisma };
export function getPrisma() { return prisma; }
export default prismaDefault;
