-- CreateTable
CREATE TABLE `ContemplationReference` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `contemplationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContemplationReference` ADD CONSTRAINT `ContemplationReference_contemplationId_fkey` FOREIGN KEY (`contemplationId`) REFERENCES `Contemplation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
