/*
  Warnings:

  - Added the required column `path` to the `advertisments_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advertisments_files" ADD COLUMN     "path" TEXT NOT NULL;
