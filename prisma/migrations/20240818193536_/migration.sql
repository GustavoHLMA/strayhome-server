/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[campaignIdOnBlockchain]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campaignIdOnBlockchain` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "amountCollected" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "campaignIdOnBlockchain" TEXT NOT NULL,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "target" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Test";

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_campaignIdOnBlockchain_key" ON "Campaign"("campaignIdOnBlockchain");
