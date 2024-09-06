-- DropForeignKey
ALTER TABLE "advertisments_files" DROP CONSTRAINT "advertisments_files_advertisments_id_fkey";

-- AddForeignKey
ALTER TABLE "advertisments_files" ADD CONSTRAINT "advertisments_files_advertisments_id_fkey" FOREIGN KEY ("advertisments_id") REFERENCES "advertisments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
