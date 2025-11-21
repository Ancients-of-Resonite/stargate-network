/*
  Warnings:

  - Added the required column `is_headless` to the `Stargates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stargates" ADD COLUMN     "is_headless" BOOLEAN NOT NULL;
