-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'inactive',
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "serviceType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "solution" TEXT,
    "technicalId" TEXT,
    "clientId" TEXT,
    CONSTRAINT "services_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "services_technicalId_fkey" FOREIGN KEY ("technicalId") REFERENCES "Technical" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_services" ("clientId", "description", "id", "serviceType", "solution", "status", "technicalId") SELECT "clientId", "description", "id", "serviceType", "solution", "status", "technicalId" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
