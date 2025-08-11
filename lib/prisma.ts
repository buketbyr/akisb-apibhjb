import { PrismaClient } from '@prisma/client';

const hasDb = !!(process.env.DATABASE_URL && process.env.DATABASE_URL.trim());

let _prisma: PrismaClient | null = null;
if (hasDb) {
  const g = global as any;
  _prisma = g.__PRISMA__ ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') g.__PRISMA__ = _prisma;
}

export const prisma = _prisma;
export const hasDatabaseUrl = hasDb;

export function requirePrisma() {
  if (!prisma) throw new Error('DATABASE_URL missing');
  return prisma;
}
