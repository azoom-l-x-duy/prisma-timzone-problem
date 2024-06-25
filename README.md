# type-node-starter
Express Typescript boilerplate for starter development practices
- Datbase: SQLite
- ORM: Prisma
- TypeScript Execution: tsx
## Enviroment Requirement
* [volta](https://volta.sh/)

## Setup

### Config environment variable
Copy `.env.template` to `.env` and change the value for your environment setup

### Create pubsub environment

Create topic sample_topic
```
node createTopic.js sample_topic
```

Create push subscription for endpoint /pubsub/subscriber-handler
(Please check your local by ifconfig)
```
node createPushSubscription.js http://192.168.50.97:8080/pubsub/subscriber-handler sample_topic pubsub_sample_subscription
```

## Start project
```sh
$ yarn dev
```

Check your development server at `http://localhost:8080/`

## Deployment

### Config deployment project
```
gcloud config set project azoom-l-x-duy
```

Create or select a service account to represent the Pub/Sub subscription identity
```
gcloud iam service-accounts create cloudrun-pubsub-sample-invoker --display-name "Cloud Run Pub Sub Sample Project Invoker"
```

Create a Pub/Sub subscription with the service account:
My cloud run service name is: "pubsub-sample"

```
gcloud run services add-iam-policy-binding pubsub-sample --region=asia-south1 --member=serviceAccount:cloudrun-pubsub-sample-invoker@azoom-l-x-duy.iam.gserviceaccount.com --role=roles/run.invoker
```

Allow Pub/Sub to create authentication tokens in your project

```
gcloud projects add-iam-policy-binding azoom-l-x-duy --member=serviceAccount:service-327977517030@gcp-sa-pubsub.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator
```

Create a Pub/Sub subscription with the service account:
(pubsub-sample-run is topic name that I created in azoom-l-x-duy project)

```
gcloud pubsub subscriptions create pubsub-sample-run-subscription --topic pubsub-sample-run --ack-deadline=600 --push-endpoint=SERVICE-URL/pubsub/subscriber-handler  --push-auth-service-account=cloudrun-pubsub-sample-invoker@azoom-l-x-duy.iam.gserviceaccount.com
```
Replace:
  SERVICE-URL with the HTTPS URL provided on deploying the service.


Allow cloudrun compute service account role Pub/Sub Publisher to publish message to the topic

```
gcloud projects add-iam-policy-binding azoom-l-x-duy --member="serviceAccount:327977517030-compute@developer.gserviceaccount.com" --role="roles/pubsub.publisher"
```
