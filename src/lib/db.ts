import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: any };

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/ilknurablasite';

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(new Pool({ connectionString })),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
