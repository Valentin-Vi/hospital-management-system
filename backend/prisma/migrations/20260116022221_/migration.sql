/*
  Warnings:

  - You are about to drop the column `expiration_date` on the `medications` table. All the data in the column will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_productId_fkey";

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "expiration_date",
ADD COLUMN     "minimum_quantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "items";

-- CreateTable
CREATE TABLE "batches" (
    "batchId" SERIAL NOT NULL,
    "medicationId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("batchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "batches_batchId_key" ON "batches"("batchId");

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("medicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
