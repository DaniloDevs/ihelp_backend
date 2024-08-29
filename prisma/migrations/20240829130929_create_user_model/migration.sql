-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "primeiroNome" TEXT NOT NULL,
    "segundoNome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "numeroTelefone" TEXT,
    "tipoUser" TEXT NOT NULL DEFAULT 'CLIENTE',
    "imageUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
