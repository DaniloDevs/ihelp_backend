-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Technical" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "services" (
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

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Technical_id_key" ON "Technical"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Technical_email_key" ON "Technical"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");
