/*
  Warnings:

  - You are about to drop the column `idade` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numeroTelefone` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `primeiroNome` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `segundoNome` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `tipoUser` on the `Users` table. All the data in the column will be lost.
  - Added the required column `age` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENTE', 'TECNICO');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "idade",
DROP COLUMN "numeroTelefone",
DROP COLUMN "primeiroNome",
DROP COLUMN "segundoNome",
DROP COLUMN "tipoUser",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "userType" "UserType" NOT NULL;
