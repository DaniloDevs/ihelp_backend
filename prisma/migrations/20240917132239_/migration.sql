/*
  Warnings:

  - Made the column `phoneNumber` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "imageUrl" TEXT
);
INSERT INTO "new_Users" ("age", "email", "firstName", "id", "imageUrl", "lastName", "phoneNumber", "userType") SELECT "age", "email", "firstName", "id", "imageUrl", "lastName", "phoneNumber", "userType" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
