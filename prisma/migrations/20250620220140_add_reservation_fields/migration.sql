/*
  Warnings:

  - You are about to drop the column `room` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `correo` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrada` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salida` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "room",
DROP COLUMN "username",
ADD COLUMN     "comentarios" TEXT,
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "entrada" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "salida" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telefono" TEXT;
