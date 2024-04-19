# prisma-timezone-problem
Express Typescript boilerplate for starter development practices
- Datbase: MySQL
- ORM: Prisma
- TypeScript Execution: tsx

## To see the problem of Prisma ORM with MySQL Timestamp data type in this case please correct your environment setup
- MySQL timezone is Aisa/Tokyo +09:00

## Setup

### Config environment variable
Copy `.env.template` to `.env` and change the value for your environment setup
### Migrate DB
```sh
$ yarn prisma:migrate-dev
```

### Seeding Data
```sh
$ yarn prisma:seed-dev
```

## Start project
```sh
$ yarn dev
```

Check your development server at `http://localhost:5004/`

## See the problem
- Open `http://localhost:5004/quotes` and you will see the problem of Prisma ORM with MySQL Timestamp data type
- Please take a look at `createdAtTimestampDb` and `createdDatetime` values
