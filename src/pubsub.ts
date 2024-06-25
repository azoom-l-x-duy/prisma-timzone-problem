import dotenv from 'dotenv'
import { Buffer } from 'node:buffer'
import { PubSub } from '@google-cloud/pubsub'

dotenv.config()

const isDevelopmentMode = process.env.NODE_ENV === 'development'

console.log('Pubsub in real environment, emulator mode is: ', isDevelopmentMode ? 'ON' : 'OFF')

export const pubSubClient = new PubSub({
  emulatorMode: isDevelopmentMode,
  projectId: isDevelopmentMode ? process.env.PUBSUB_EMULATOR_PROJECT_ID : undefined,
  apiEndpoint: isDevelopmentMode ? process.env.PUBSUB_EMULATOR_HOST : undefined,
})

export const publishEvent = async (
  operatingCompanyId: number,
  processTriggerTypeId: number,
  eventParameter: Record<string, unknown>,
) => {
  const dataBuffer = Buffer.from(JSON.stringify({
    operatingCompanyId,
    processTriggerTypeId,
    eventParameter,
  }))
  const messageId = await pubSubClient
    .topic('pubsub-sample-run')
    // .topic(process.env.PUBSUB_EMULATOR_TOPIC_NAME)
    .publishMessage({ data: dataBuffer })
    .catch(err => console.log(err))

  // eslint-disable-next-line no-console
  console.log(`[PubSub] Message with ID ${messageId} published.`)

  return messageId
}

export const getSubscription = async() => {
  // Gets the metadata for the subscription
  const [metadata] = await pubSubClient
    .subscription('pubsub-sample-run-subscription')
    .getMetadata();

  console.log(`Subscription: ${metadata.name}`);
  console.log(`Topic: ${metadata.topic}`);
  console.log(`Push config: ${metadata?.pushConfig?.pushEndpoint}`);
  console.log(`Ack deadline: ${metadata.ackDeadlineSeconds}s`);
}

export const getTopic = async() => {
  const topics = await pubSubClient.getTopics()
  console.log('Topics: ', JSON.stringify(topics[2]))
}
