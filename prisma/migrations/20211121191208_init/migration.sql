/*
  Warnings:

  - You are about to alter the column `verifyNumber` on the `AuthenticationCode` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(6)`.
  - You are about to alter the column `bibleKey` on the `Bookmark` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `name` on the `Church` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `type` on the `Church` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `description` on the `Church` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `address` on the `Church` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `phoneNumber` on the `Church` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - Added the required column `uri` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_groupId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `AuthenticationCode` MODIFY `verifyNumber` VARCHAR(6) NOT NULL;

-- AlterTable
ALTER TABLE `Bookmark` MODIFY `bibleKey` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Church` MODIFY `name` VARCHAR(20) NOT NULL,
    MODIFY `type` VARCHAR(30) NOT NULL,
    MODIFY `description` VARCHAR(100) NULL,
    MODIFY `address` VARCHAR(30) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `uri` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `groupId`,
    MODIFY `name` VARCHAR(20) NOT NULL;
