/*
  Warnings:

  - The required column `custom_id` was added to the `instagram_user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "instagram_user" ADD COLUMN     "custom_id" TEXT NOT NULL;
