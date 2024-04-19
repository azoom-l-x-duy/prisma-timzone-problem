[WIP] TODO...

I'm trying to reproduce problem when working with Prisma ORM and MySQL database with Timestamp data type.

First, I create a new "quotes" table with a Timestamp column in MySQL database:
**Prisma Schemma
```prisma
  createdDatetime DateTime    @default(now()) @map("created_datetime")

  createdAtTimestampOrm             DateTime?     @map("created_at_timestamp_orm") @db.Timestamp()
  createdAtTimestampDb              DateTime      @map("created_at_timestamp_db") @db.Timestamp() @default(dbgenerated("NOW()"))
```

```sql
CREATE TABLE `quotes` (
    ...,
    `created_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at_timestamp_orm` TIMESTAMP NULL,
    `created_at_timestamp_db` TIMESTAMP NOT NULL DEFAULT NOW(),
```

`created_datetime` with `Datetime` data type and default value is now() function on Prisma layer.
`created_at_timestamp_orm` is a nullable column with `Timestamp` data type and you see *Prisma will prevent you to create default value for this data type* because it maybe lead to inconsistency between Prisma and Database layer. (I will explain more about this later)

`created_at_timestamp_db` is a non-nullable column with `Timestamp` data type and default value is NOW() function on Database layer.

