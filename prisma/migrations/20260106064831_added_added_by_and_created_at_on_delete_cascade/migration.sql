/*
  Warnings:

  - Added the required column `addedBy` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Upvotes" DROP CONSTRAINT "Upvotes_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "addedBy" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
