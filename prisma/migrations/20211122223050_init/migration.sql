/*
  Warnings:

  - You are about to alter the column `chapter` on the `Bookmark` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Bookmark` MODIFY `chapter` INTEGER NOT NULL;
