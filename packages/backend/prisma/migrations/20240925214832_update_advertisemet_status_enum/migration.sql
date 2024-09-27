/*
  Warnings:

  - The values [waiting] on the enum `AdvertisementStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdvertisementStatus_new" AS ENUM ('progress', 'paused', 'finished');
ALTER TABLE "advertisements" ALTER COLUMN "status" TYPE "AdvertisementStatus_new" USING ("status"::text::"AdvertisementStatus_new");
ALTER TYPE "AdvertisementStatus" RENAME TO "AdvertisementStatus_old";
ALTER TYPE "AdvertisementStatus_new" RENAME TO "AdvertisementStatus";
DROP TYPE "AdvertisementStatus_old";
COMMIT;
