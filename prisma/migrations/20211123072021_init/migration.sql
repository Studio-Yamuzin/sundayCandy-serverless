/*
  Warnings:

  - Added the required column `text` to the `Contemplation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contemplation` ADD COLUMN `text` VARCHAR(200) NOT NULL;
