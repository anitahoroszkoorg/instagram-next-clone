/*
  Warnings:

  - A unique constraint covering the columns `[custom_id]` on the table `instagram_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "instagram_user_custom_id_key" ON "instagram_user"("custom_id");
