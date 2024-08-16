/*
  Warnings:

  - You are about to drop the column `room_number` on the `room` table. All the data in the column will be lost.
  - Added the required column `room_name` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` DROP COLUMN `room_number`,
    ADD COLUMN `room_name` VARCHAR(191) NOT NULL;
