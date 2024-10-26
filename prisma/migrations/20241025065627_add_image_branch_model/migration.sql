/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "BranchImage" (
    "id" CHAR(36) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "publicId" VARCHAR(200) NOT NULL,
    "branchOfficeId" CHAR(36) NOT NULL,

    CONSTRAINT "BranchImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "id" CHAR(36) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "publicId" VARCHAR(200) NOT NULL,
    "postId" CHAR(36) NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BranchImage" ADD CONSTRAINT "BranchImage_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
