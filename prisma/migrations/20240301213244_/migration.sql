-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "instagram_user_id" INTEGER,
    "post_id" INTEGER,
    "comment_text" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "follower" (
    "follower_id" SERIAL NOT NULL,
    "follower_instagram_user_id" INTEGER,
    "following_instagram_user_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follower_pkey" PRIMARY KEY ("follower_id")
);

-- CreateTable
CREATE TABLE "instagram_like" (
    "like_id" SERIAL NOT NULL,
    "instagram_user_id" INTEGER,
    "post_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instagram_like_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "instagram_user" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "bio" VARCHAR(255),
    "profile_image_url" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instagram_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "instagram_user_id" INTEGER,
    "caption" VARCHAR(255),
    "image_url" VARCHAR(500),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instagram_user_username_key" ON "instagram_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "instagram_user_email_key" ON "instagram_user"("email");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_instagram_user_id_fkey" FOREIGN KEY ("instagram_user_id") REFERENCES "instagram_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_follower_instagram_user_id_fkey" FOREIGN KEY ("follower_instagram_user_id") REFERENCES "instagram_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_following_instagram_user_id_fkey" FOREIGN KEY ("following_instagram_user_id") REFERENCES "instagram_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "instagram_like" ADD CONSTRAINT "instagram_like_instagram_user_id_fkey" FOREIGN KEY ("instagram_user_id") REFERENCES "instagram_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "instagram_like" ADD CONSTRAINT "instagram_like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_instagram_user_id_fkey" FOREIGN KEY ("instagram_user_id") REFERENCES "instagram_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
