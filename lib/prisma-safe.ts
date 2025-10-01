
import { prisma as client } from '@/lib/prisma'

export function getPrismaSafe() {
  // If DATABASE_URL is not set, Prisma will throw on first query.
  // We guard by returning null and letting pages use mock data.
  if (!process.env.NEXT_PUBLIC_BASE_URL) return null
  return client
}
