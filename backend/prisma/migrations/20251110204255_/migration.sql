/*
  Warnings:

  - You are about to drop the column `minimun_quantity` on the `inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "minimun_quantity",
ADD COLUMN     "minimum_quantity" INTEGER NOT NULL DEFAULT 0;
