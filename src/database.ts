import Prisma from '@prisma/client'

export default new Prisma.PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})
