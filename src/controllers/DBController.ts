import { Request, Response } from 'express'
import prisma from '../database'

class DBController {
  static index = async(req: Request, res: Response) => {
    const sessionTimezone = await prisma.$queryRaw`SELECT @@session.time_zone;`

    return res.send(sessionTimezone)
  }
}

export default DBController
