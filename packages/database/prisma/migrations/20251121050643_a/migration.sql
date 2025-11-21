/*
  Warnings:

  - You are about to drop the column `tags` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "tags";
