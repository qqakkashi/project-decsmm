/*
  Warnings:

  - Added the required column `creator_id` to the `advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advertisements" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
