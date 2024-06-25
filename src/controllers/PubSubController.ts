import { Request, Response } from 'express'
import { publishEvent } from '../pubsub'

class PubSubController {
  static publishMessage = async(req: Request, res: Response) => {
    const { textMessage } = req.body

    if (!textMessage) return res.status(400).send()

    const messageId = await publishEvent(1, 1, { textMessage }).catch((err) => console.error(err))

    if (!messageId) return res.send('Failed publish message to topic')

    return res.send('Message published')
  }

  static subscriberHandler = async(req: Request, res: Response) => {
    let message
    try {
      message = JSON.parse(Buffer.from(req.body.message.data, 'base64').toString())

    } catch (err) {
      console.error(err)
      return res.status(400).send('Message is not valid.')
    }

    console.log('subscriberHandler got message', JSON.stringify(message))

    return res.send(message)
  }
}

export default PubSubController
