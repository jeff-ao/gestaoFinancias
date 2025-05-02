/*
  Warnings:

  - A unique constraint covering the columns `[mes,ano]` on the table `MesAno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MesAno_mes_ano_key" ON "MesAno"("mes", "ano");
