/*
  Warnings:

  - You are about to drop the column `text` on the `Contemplation` table. All the data in the column will be lost.
  - Added the required column `content` to the `Contemplation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contemplation` DROP COLUMN `text`,
    ADD COLUMN `content` VARCHAR(200) NOT NULL;
