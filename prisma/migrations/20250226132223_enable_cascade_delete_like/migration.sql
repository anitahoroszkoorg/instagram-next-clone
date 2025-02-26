-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_post_id_fkey";

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
