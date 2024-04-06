/*
  Warnings:

  - You are about to alter the column `custom_id` on the `instagram_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "instagram_user" ALTER COLUMN "custom_id" SET DATA TYPE VARCHAR(255);
