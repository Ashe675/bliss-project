/*
  Warnings:

  - You are about to drop the `BranchImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('branch', 'post');

-- DropForeignKey
ALTER TABLE "BranchImage" DROP CONSTRAINT "BranchImage_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- DropTable
DROP TABLE "BranchImage";

-- DropTable
DROP TABLE "PostImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" CHAR(36) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "publicId" VARCHAR(200) NOT NULL,
    "imageType" "ImageType" NOT NULL,
    "branchOfficeId" CHAR(36),
    "postId" CHAR(36),

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
