/*
  Warnings:

  - Added the required column `aiProvider` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedApiKey` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "aiProvider" TEXT NOT NULL,
ADD COLUMN     "encryptedApiKey" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL;
