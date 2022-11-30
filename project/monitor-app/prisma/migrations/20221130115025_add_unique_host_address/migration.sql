/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Host` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Host_address_key" ON "Host"("address");
