FROM node:18.19.1-alpine as builder
WORKDIR /app
COPY yarn.lock .env ./
COPY package.deps.json package.json
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.19.1-alpine
WORKDIR /app
ARG TZ='Asia/Tokyo'
ENV DEFAULT_TZ ${TZ}
RUN apk add --update --no-cache tzdata && \
   cp /usr/share/zoneinfo/$DEFAULT_TZ /etc/localtime && \
   echo $DEFAULT_TZ > /etc/timezone && \
   apk del tzdata && \
   rm -rf /var/cache/apk/*
COPY --from=builder /app .
ENTRYPOINT ["yarn", "start"]
