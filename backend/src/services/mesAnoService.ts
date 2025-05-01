import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function upsertMesAno(mes: number, ano: number) {
  return await prisma.mesAno.upsert({
    where: { mes_ano: { mes, ano } },
    update: {},
    create: { mes, ano },
  });
}
