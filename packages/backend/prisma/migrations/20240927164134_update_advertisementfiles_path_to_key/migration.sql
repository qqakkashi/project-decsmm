/*
  Warnings:

  - You are about to drop the column `path` on the `advertisements_files` table. All the data in the column will be lost.
  - Added the required column `key` to the `advertisements_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advertisements_files" DROP COLUMN "path",
ADD COLUMN     "key" TEXT NOT NULL;
