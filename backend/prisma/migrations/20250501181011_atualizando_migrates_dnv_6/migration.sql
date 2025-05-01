-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Categoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("createdAt", "id", "nome", "updatedAt", "usuario_id", "uuid") SELECT "createdAt", "id", "nome", "updatedAt", "usuario_id", "uuid" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE UNIQUE INDEX "Categoria_uuid_key" ON "Categoria"("uuid");
CREATE UNIQUE INDEX "Categoria_nome_usuario_id_key" ON "Categoria"("nome", "usuario_id");
CREATE TABLE "new_Parcelamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "valor" REAL NOT NULL,
    "qtde_parcelas" INTEGER NOT NULL,
    "valor_parcela" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Parcelamento_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Parcelamento" ("createdAt", "data_fim", "data_inicio", "descricao", "id", "qtde_parcelas", "updatedAt", "usuario_id", "uuid", "valor", "valor_parcela") SELECT "createdAt", "data_fim", "data_inicio", "descricao", "id", "qtde_parcelas", "updatedAt", "usuario_id", "uuid", "valor", "valor_parcela" FROM "Parcelamento";
DROP TABLE "Parcelamento";
ALTER TABLE "new_Parcelamento" RENAME TO "Parcelamento";
CREATE UNIQUE INDEX "Parcelamento_uuid_key" ON "Parcelamento"("uuid");
CREATE TABLE "new_ResumoMensal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "entrada" REAL NOT NULL,
    "saida" REAL NOT NULL,
    "saldo" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "mesAno_id" INTEGER NOT NULL,
    CONSTRAINT "ResumoMensal_mesAno_id_fkey" FOREIGN KEY ("mesAno_id") REFERENCES "MesAno" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ResumoMensal_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ResumoMensal" ("createdAt", "entrada", "id", "mesAno_id", "saida", "saldo", "updatedAt", "usuario_id", "uuid") SELECT "createdAt", "entrada", "id", "mesAno_id", "saida", "saldo", "updatedAt", "usuario_id", "uuid" FROM "ResumoMensal";
DROP TABLE "ResumoMensal";
ALTER TABLE "new_ResumoMensal" RENAME TO "ResumoMensal";
CREATE UNIQUE INDEX "ResumoMensal_uuid_key" ON "ResumoMensal"("uuid");
CREATE UNIQUE INDEX "ResumoMensal_mesAno_id_usuario_id_key" ON "ResumoMensal"("mesAno_id", "usuario_id");
CREATE TABLE "new_Transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "data" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "mesAno_id" INTEGER,
    "parcelamento_id" INTEGER,
    CONSTRAINT "Transacao_parcelamento_id_fkey" FOREIGN KEY ("parcelamento_id") REFERENCES "Parcelamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transacao_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transacao_mesAno_id_fkey" FOREIGN KEY ("mesAno_id") REFERENCES "MesAno" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("categoria_id", "createdAt", "data", "descricao", "id", "mesAno_id", "parcelamento_id", "tipo", "updatedAt", "usuario_id", "uuid", "valor") SELECT "categoria_id", "createdAt", "data", "descricao", "id", "mesAno_id", "parcelamento_id", "tipo", "updatedAt", "usuario_id", "uuid", "valor" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
CREATE UNIQUE INDEX "Transacao_uuid_key" ON "Transacao"("uuid");
CREATE TABLE "new_TransacaoRecorrente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "frequencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    CONSTRAINT "TransacaoRecorrente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TransacaoRecorrente_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TransacaoRecorrente" ("categoria_id", "createdAt", "data", "descricao", "frequencia", "id", "tipo", "updatedAt", "usuario_id", "uuid", "valor") SELECT "categoria_id", "createdAt", "data", "descricao", "frequencia", "id", "tipo", "updatedAt", "usuario_id", "uuid", "valor" FROM "TransacaoRecorrente";
DROP TABLE "TransacaoRecorrente";
ALTER TABLE "new_TransacaoRecorrente" RENAME TO "TransacaoRecorrente";
CREATE UNIQUE INDEX "TransacaoRecorrente_uuid_key" ON "TransacaoRecorrente"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
