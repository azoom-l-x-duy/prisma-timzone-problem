import { Router, Request, Response } from 'express'
// import QuoteController from '@root/controllers/QuoteController'
import PubSubController from '../controllers/PubSubController'

const router = Router()

router.get('/', (req: Request, res: Response) => { return res.send('Hello world!') })

// router.get('/quotes', QuoteController.index)
// router.post('/quotes', QuoteController.store)

// PubSub route testing
router.post('/pubsub/publish-message', PubSubController.publishMessage)
router.post('/pubsub/subscriber-handler', PubSubController.subscriberHandler)

export default router
