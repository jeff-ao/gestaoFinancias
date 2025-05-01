import { PrismaClient, TipoTransacao } from "@prisma/client";
import { Transacao } from "../types";

const prisma = new PrismaClient();

export async function upsertResumo(
  usuario_id: number,
  mesAno_id: number,
  transacao: Transacao
) {
  const { tipo, valor } = transacao;

  return await prisma.resumoMensal.upsert({
    where: {
      usuario_id_mesAno_id: {
        usuario_id,
        mesAno_id,
      },
    },
    update: {},
    create: {
      entrada: tipo === "entrada" ? valor : 0,
      saida: tipo === "saida" ? valor : 0,
      saldo: tipo === "entrada" ? valor : -valor,
      usuario: { connect: { id: usuario_id } },
      MesAno: { connect: { id: mesAno_id } },
    },
  });
}

export async function atualizarResumo(
  resumoId: number,
  tipo: TipoTransacao,
  valor: number
) {
  return await prisma.resumoMensal.update({
    where: { id: resumoId },
    data: {
      entrada: tipo === "entrada" ? { increment: valor } : undefined,
      saida: tipo === "saida" ? { increment: valor } : undefined,
      saldo: tipo === "entrada" ? { increment: valor } : { decrement: valor },
    },
  });
}

export async function getResumoMensal(usuario_id: number) {
  return await prisma.resumoMensal.findMany({
    where: { usuario_id },
    include: {
      MesAno: true,
    },
  });
}
