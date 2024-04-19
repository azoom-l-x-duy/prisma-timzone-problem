import { Router, Request, Response } from 'express'
import QuoteController from '@root/controllers/QuoteController'
import DBController from '@root/controllers/DBController'

const router = Router()

router.get('/', (req: Request, res: Response) => { return res.send('Hello world!') })

router.get('/quotes', QuoteController.index)
router.post('/quotes', QuoteController.store)
router.put('/quotes/:id', QuoteController.update)

router.get('/connection-tz', DBController.index)

export default router
