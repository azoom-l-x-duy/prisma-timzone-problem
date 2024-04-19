-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quote` VARCHAR(191) NOT NULL,
    `saidBy` VARCHAR(191) NOT NULL,
    `movie_id` INTEGER NOT NULL,
    `created_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_datetime` DATETIME(3) NULL,
    `created_at_timestamp_orm` TIMESTAMP NULL,
    `created_at_timestamp_db` TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
