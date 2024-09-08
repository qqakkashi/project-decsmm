/*
  Warnings:

  - You are about to drop the `advertisments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advertisments_files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "advertisments_files" DROP CONSTRAINT "advertisments_files_advertisments_id_fkey";

-- DropTable
DROP TABLE "advertisments";

-- DropTable
DROP TABLE "advertisments_files";

-- CreateTable
CREATE TABLE "advertisements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "transition" DOUBLE PRECISION NOT NULL,
    "max_transition" DOUBLE PRECISION NOT NULL,
    "status" "AdvertisementStatus" NOT NULL,

    CONSTRAINT "advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisements_files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" "AdvertisementFileType" NOT NULL,
    "advertisements_id" TEXT NOT NULL,

    CONSTRAINT "advertisements_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "advertisements_files" ADD CONSTRAINT "advertisements_files_advertisements_id_fkey" FOREIGN KEY ("advertisements_id") REFERENCES "advertisements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
