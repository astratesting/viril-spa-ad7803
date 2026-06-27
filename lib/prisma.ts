import { PrismaClient } from "@prisma/client";
import { isRealEnv } from "@/lib/env";

// Production PostgreSQL client. In the sandbox/preview demo (no DATABASE_URL or
// a placeholder), the app uses the local JSON-file store in lib/db.ts instead,
// so this singleton is only instantiated when a real Postgres URL is present.
const isRealDatabaseUrl = () => isRealEnv(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  isRealDatabaseUrl() && globalForPrisma.prisma
    ? globalForPrisma.prisma
    : isRealDatabaseUrl()
    ? (globalForPrisma.prisma = new PrismaClient())
    : null;
