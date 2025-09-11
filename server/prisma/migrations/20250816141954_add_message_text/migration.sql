/*
  Warnings:

  - Added the required column `image` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
