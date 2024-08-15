/*
  Warnings:

  - The primary key for the `UserTest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserTest" DROP CONSTRAINT "UserTest_pkey",
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserTest_id_seq";
