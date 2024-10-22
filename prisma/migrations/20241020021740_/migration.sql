-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "serviceType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "solution" TEXT,
    "clientsId" TEXT NOT NULL,
    "technicalsId" TEXT NOT NULL,
    CONSTRAINT "service_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "service_technicalsId_fkey" FOREIGN KEY ("technicalsId") REFERENCES "technicals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_service" ("accepted", "clientsId", "description", "id", "serviceType", "solution", "technicalsId") SELECT "accepted", "clientsId", "description", "id", "serviceType", "solution", "technicalsId" FROM "service";
DROP TABLE "service";
ALTER TABLE "new_service" RENAME TO "service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
