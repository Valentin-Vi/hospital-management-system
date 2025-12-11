/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_medicationId_fkey";

-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "minimum_quantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "inventory";
