/*
  Warnings:

  - Added the required column `usuario_id` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "Categoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("createdAt", "id", "nome", "updatedAt", "uuid") SELECT "createdAt", "id", "nome", "updatedAt", "uuid" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE UNIQUE INDEX "Categoria_uuid_key" ON "Categoria"("uuid");
CREATE UNIQUE INDEX "Categoria_nome_usuario_id_key" ON "Categoria"("nome", "usuario_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
