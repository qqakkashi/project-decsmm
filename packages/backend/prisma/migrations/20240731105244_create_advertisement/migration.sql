-- CreateEnum
CREATE TYPE "AdvertisementFileType" AS ENUM ('image', 'document');

-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('waiting', 'paused', 'finished');

-- CreateTable
CREATE TABLE "advertisments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "transition" DOUBLE PRECISION NOT NULL,
    "max_transition" DOUBLE PRECISION NOT NULL,
    "status" "AdvertisementStatus" NOT NULL,

    CONSTRAINT "advertisments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisments_files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AdvertisementFileType" NOT NULL,
    "advertisments_id" TEXT NOT NULL,

    CONSTRAINT "advertisments_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "advertisments_files" ADD CONSTRAINT "advertisments_files_advertisments_id_fkey" FOREIGN KEY ("advertisments_id") REFERENCES "advertisments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
