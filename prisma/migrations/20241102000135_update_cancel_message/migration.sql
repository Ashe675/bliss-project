/*
  Warnings:

  - You are about to drop the column `response` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "response",
ADD COLUMN     "cancelMessage" VARCHAR(100);
