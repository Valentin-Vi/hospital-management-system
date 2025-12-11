-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('VISITOR', 'ADMIN', 'CLIENT', 'DOCTOR', 'DESK');

-- CreateTable
CREATE TABLE "users" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "userId" SERIAL NOT NULL,
    "type" "user_type" NOT NULL DEFAULT 'VISITOR',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "firstname" TEXT NOT NULL DEFAULT 'FirstName',

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "clients" (
    "clientId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "doctors" (
    "specialty" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "visits" (
    "visit_date" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctorId" INTEGER NOT NULL,
    "visitId" SERIAL NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("visitId")
);

-- CreateTable
CREATE TABLE "desks" (
    "deskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "admins" (
    "adminId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "items" (
    "itemId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "minimun_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "items_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "medications" (
    "medicationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "brand_name" TEXT NOT NULL,
    "generic_name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "form" TEXT NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("medicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientId_key" ON "clients"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_doctorId_key" ON "doctors"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "visits_visitId_key" ON "visits"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "desks_deskId_key" ON "desks"("deskId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_adminId_key" ON "admins"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "items_itemId_key" ON "items"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "items_productId_key" ON "items"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "medications_medicationId_key" ON "medications"("medicationId");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desks" ADD CONSTRAINT "desks_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "medications"("medicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
