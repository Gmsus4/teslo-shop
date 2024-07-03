/*
  Warnings:

  - Added the required column `state` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suburb` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "suburb" TEXT NOT NULL;
