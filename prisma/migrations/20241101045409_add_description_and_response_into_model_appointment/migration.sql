/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BranchOffice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "description" VARCHAR(100) NOT NULL,
ADD COLUMN     "response" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "BranchOffice_slug_key" ON "BranchOffice"("slug");
