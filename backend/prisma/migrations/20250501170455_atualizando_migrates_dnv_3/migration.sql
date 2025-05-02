/*
  Warnings:

  - Made the column `categoria_id` on table `Transacao` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Transacao_parcelamento_id_fkey" FOREIGN KEY ("parcelamento_id") REFERENCES "Parcelamento" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacao_mesAno_id_fkey" FOREIGN KEY ("mesAno_id") REFERENCES "MesAno" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transacao" ("categoria_id", "createdAt", "data", "descricao", "id", "mesAno_id", "parcelamento_id", "tipo", "updatedAt", "usuario_id", "uuid", "valor") SELECT "categoria_id", "createdAt", "data", "descricao", "id", "mesAno_id", "parcelamento_id", "tipo", "updatedAt", "usuario_id", "uuid", "valor" FROM "Transacao";
DROP TABLE "Transacao";
ALTER TABLE "new_Transacao" RENAME TO "Transacao";
CREATE UNIQUE INDEX "Transacao_uuid_key" ON "Transacao"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
