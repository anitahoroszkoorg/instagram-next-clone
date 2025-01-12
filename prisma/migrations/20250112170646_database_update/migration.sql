/*
  Warnings:

  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instagram_user_id` on the `comment` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image_url` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_user_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instagram_like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instagram_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `post_id` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment_text` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Made the column `caption` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_instagram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_follower_instagram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_following_instagram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "instagram_like" DROP CONSTRAINT "instagram_like_instagram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "instagram_like" DROP CONSTRAINT "instagram_like_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_instagram_user_id_fkey";

-- AlterTable
ALTER TABLE "comment" DROP CONSTRAINT "comment_pkey",
DROP COLUMN "instagram_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "comment_id" DROP DEFAULT,
ALTER COLUMN "comment_id" SET DATA TYPE TEXT,
ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "post_id" SET DATA TYPE TEXT,
ALTER COLUMN "comment_text" SET NOT NULL,
ALTER COLUMN "comment_text" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id");
DROP SEQUENCE "comment_comment_id_seq";

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "image_url",
DROP COLUMN "instagram_user_id",
ADD COLUMN     "image" BYTEA,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "post_id" DROP DEFAULT,
ALTER COLUMN "post_id" SET DATA TYPE TEXT,
ALTER COLUMN "caption" SET NOT NULL,
ALTER COLUMN "caption" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("post_id");
DROP SEQUENCE "post_post_id_seq";

-- DropTable
DROP TABLE "follower";

-- DropTable
DROP TABLE "instagram_like";

-- DropTable
DROP TABLE "instagram_user";

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "like" (
    "like_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "follow" (
    "follow_id" TEXT NOT NULL,
    "following_user_id" TEXT NOT NULL,
    "followed_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("follow_id")
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "message_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "notification_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "like_id" TEXT,
    "comment_id" TEXT,
    "post_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_user_id_fkey" FOREIGN KEY ("following_user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "like"("like_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;
