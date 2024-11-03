-- CreateEnum
CREATE TYPE "OfficeType" AS ENUM ('barbershop', 'salon');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'employee');

-- CreateEnum
CREATE TYPE "StatusAppointment" AS ENUM ('pending', 'accepted', 'declined');

-- CreateTable
CREATE TABLE "BranchOffice" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "rating" INTEGER,
    "longevityYear" INTEGER NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userOwnerId" CHAR(36) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "officeType" "OfficeType" NOT NULL,

    CONSTRAINT "BranchOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" CHAR(36) NOT NULL,
    "firstName" VARCHAR(60) NOT NULL,
    "lastName" VARCHAR(60) NOT NULL,
    "user" VARCHAR(70) NOT NULL,
    "email" VARCHAR(80),
    "password" VARCHAR(80) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "profileImage" VARCHAR(45),
    "isActive" BOOLEAN DEFAULT true,
    "description" VARCHAR(100),
    "phoneNumber" TEXT,
    "branchOfficeId" CHAR(36),
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suscription" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(85) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Suscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSuscription" (
    "id" CHAR(36) NOT NULL,
    "userId" CHAR(36) NOT NULL,
    "suscriptionId" CHAR(36) NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalDate" DATE NOT NULL,

    CONSTRAINT "UserSuscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "description" VARCHAR(100),

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BenefitSuscription" (
    "benefitId" CHAR(36) NOT NULL,
    "suscriptionId" CHAR(36) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BenefitSuscription_pkey" PRIMARY KEY ("benefitId","suscriptionId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" CHAR(36) NOT NULL,
    "raiting" INTEGER NOT NULL,
    "comment" VARCHAR(100),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewerId" CHAR(36) NOT NULL,
    "revieweeId" CHAR(36) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" CHAR(36) NOT NULL,
    "appointmentDate" DATE NOT NULL,
    "status" "StatusAppointment" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userSchedulerId" CHAR(36) NOT NULL,
    "userScheduledId" CHAR(36) NOT NULL,
    "finalDate" TIMESTAMP(3),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "idService" CHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "branchOfficeId" CHAR(36) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("idService")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" CHAR(36) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "userId" CHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" CHAR(36) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "publicId" VARCHAR(200) NOT NULL,
    "postId" CHAR(36) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- CreateIndex
CREATE INDEX "User_email_user_idx" ON "User"("email", "user");

-- AddForeignKey
ALTER TABLE "BranchOffice" ADD CONSTRAINT "BranchOffice_userOwnerId_fkey" FOREIGN KEY ("userOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSuscription" ADD CONSTRAINT "UserSuscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSuscription" ADD CONSTRAINT "UserSuscription_suscriptionId_fkey" FOREIGN KEY ("suscriptionId") REFERENCES "Suscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitSuscription" ADD CONSTRAINT "BenefitSuscription_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "Benefit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitSuscription" ADD CONSTRAINT "BenefitSuscription_suscriptionId_fkey" FOREIGN KEY ("suscriptionId") REFERENCES "Suscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userSchedulerId_fkey" FOREIGN KEY ("userSchedulerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userScheduledId_fkey" FOREIGN KEY ("userScheduledId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
