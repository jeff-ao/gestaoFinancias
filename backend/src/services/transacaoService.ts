import { upsertResumo, atualizarResumo } from "./resumoMensalService";
import { PrismaClient } from "@prisma/client";
import usuarioService from "./usuarioService";
import { Transacao } from "../types";
import { validarTransacao } from "../validations/transacaoValidations";
import { upsertMesAno } from "./mesAnoService";

const prisma = new PrismaClient();

const transacaoService = {
  postTranscao: async (usuario_uuid: string, transacaoData: Transacao) => {
    try {
      const usuario = await usuarioService.getUsuarioByUUIID(usuario_uuid);
      if ("error" in usuario) return { error: usuario.error };

      const validacao = validarTransacao(transacaoData);
      if (validacao) return { error: validacao };

      const dataTransacao = new Date(transacaoData.data);
      const mes = dataTransacao.getMonth() + 1;
      const ano = dataTransacao.getFullYear();

      const mesAno = await upsertMesAno(mes, ano);
      const resumo = await upsertResumo(usuario.id, mesAno.id, transacaoData);

      await atualizarResumo(resumo.id, transacaoData.tipo, transacaoData.valor);

      const novaTransacao = await prisma.transacao.create({
        data: {
          usuario: { connect: { id: usuario.id } },
          valor: transacaoData.valor,
          tipo: transacaoData.tipo,
          descricao: transacaoData.descricao,
          data: dataTransacao,
          Categoria: {
            connectOrCreate: {
              where: {
                nome_usuario_id: {
                  nome: transacaoData.Categoria.nome,
                  usuario_id: usuario.id,
                },
              },
              create: {
                nome: transacaoData.Categoria.nome,
                usuario: { connect: { id: usuario.id } },
              },
            },
          },
          MesAno: { connect: { id: mesAno.id } },
        },
      });

      return novaTransacao;
    } catch (error) {
      console.error(error);
      return { error: "Erro ao criar transação" };
    }
  },
  getTransacoesSaiada: async (usuario_uuid: string) => {
    try {
      const usuario = await usuarioService.getUsuarioByUUIID(usuario_uuid);
      if ("error" in usuario) return { error: usuario.error };

      const currentDate = new Date();
      const mes = currentDate.getMonth() + 1;
      const ano = currentDate.getFullYear();

      const mesAno = await prisma.mesAno.findFirst({
        where: { mes, ano },
        include: { ResumoMensal: true },
      });

      const resumoMensal = await prisma.resumoMensal.findFirst({
        where: { usuario_id: usuario.id, mesAno_id: mesAno?.id },
        include: { MesAno: true },
      });

      const transacoes = await prisma.transacao.findMany({
        where: { usuario_id: usuario.id, mesAno_id: mesAno?.id, tipo: "saida" },
        include: {
          Categoria: true,
        },
        orderBy: { data: "desc" },
      });

      return { ...resumoMensal, transacoes };
    } catch (error) {
      console.error(error);
      return { error: "Erro ao buscar transações" };
    }
  },
  deleteTransacao: async (transao_uuid: string) => {
    try {
      const getTransacao = await prisma.transacao.findFirst({
        where: { uuid: transao_uuid },
        include: { MesAno: true, usuario: true, Categoria: true },
      });

      if (!getTransacao) return { error: "Transação não encontrada" };

      if (!getTransacao) return { error: "Transação não encontrada" };
      if (!getTransacao.usuario) return { error: "Usuário não encontrado" };
      if (!getTransacao.MesAno) return { error: "Mês/Ano não encontrado" };

      const resumoMensal = await prisma.resumoMensal.findFirst({
        where: {
          usuario_id: getTransacao.usuario.id,
          mesAno_id: getTransacao.MesAno.id,
        },
      });

      if (!resumoMensal) return { error: "Resumo mensal não encontrado" };

      await atualizarResumo(
        resumoMensal?.id,
        getTransacao.tipo,
        -getTransacao.valor
      );

      const transacao = await prisma.transacao.delete({
        where: { uuid: transao_uuid },
      });

      return { message: "Transação deletada com sucesso", transacao };
    } catch (error) {
      console.error(error);
      return { error: "Erro ao deletar transação" };
    }
  },
};

export default transacaoService;
