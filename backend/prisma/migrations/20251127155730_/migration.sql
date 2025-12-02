/*
  Warnings:

  - You are about to drop the column `productId` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_date` on the `medications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicationId]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `medicationId` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_productId_fkey";

-- DropIndex
DROP INDEX "inventory_productId_key";

-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "productId",
ADD COLUMN     "medicationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "expiration_date";

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

-- CreateIndex
CREATE UNIQUE INDEX "inventory_medicationId_key" ON "inventory"("medicationId");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("medicationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("medicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
