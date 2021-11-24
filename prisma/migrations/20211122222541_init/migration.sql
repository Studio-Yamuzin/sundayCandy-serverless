/*
  Warnings:

  - You are about to drop the column `bibleKey` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `chapter` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bookmark` DROP COLUMN `bibleKey`,
    ADD COLUMN `chapter` VARCHAR(20) NOT NULL,
    ADD COLUMN `title` VARCHAR(20) NOT NULL;
