/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "zipcode" TEXT;

-- DropEnum
DROP TYPE "Role";
