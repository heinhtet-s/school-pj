/*
  Warnings:

  - You are about to drop the column `user_id` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `room_class_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the `room_class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `guest_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guest_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_night` to the `room_type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `booking_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `room_room_class_id_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `user_id`,
    ADD COLUMN `guest_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `guest` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `dob` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `user_id`,
    ADD COLUMN `guest_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `room_class_id`;

-- AlterTable
ALTER TABLE `room_type` ADD COLUMN `price_per_night` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `room_class`;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_guest_id_fkey` FOREIGN KEY (`guest_id`) REFERENCES `guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_guest_id_fkey` FOREIGN KEY (`guest_id`) REFERENCES `guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
