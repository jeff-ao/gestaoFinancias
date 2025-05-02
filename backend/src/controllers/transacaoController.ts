import transacaoService from "../services/transacaoService";
import { Request, Response } from "express";
import { DadosHomeDTO } from "../dtos/transacaoDTO";
const transacaoController = {
  postTransacao: async (req: Request, res: Response) => {
    const user_uuid = req.body.user_uuid;
    const transacaoData = req.body.transacaoData;

    try {
      const response = await transacaoService.postTranscao(
        user_uuid,
        transacaoData
      );
      if ("error" in response) {
        return res.status(400).json({ error: response.error });
      }
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error in postTransacao:", error);
      return res.status(500).json({ error: "Erro ao criar transação" });
    }
  },
  getTransacoes: async (req: Request, res: Response) => {
    try {
      const user_uuid = req.params.user_uuid as string;

      const response = await transacaoService.getTransacoesSaiada(user_uuid);
      if ("error" in response)
        return res.status(400).json({ error: response.error });

      return res.status(200).json(new DadosHomeDTO(response));
    } catch (error) {
      console.error("Error in getTransacoes:", error);
      return res.status(500).json({ error: "Erro ao buscar transações" });
    }
  },
  deleteTransacao: async (req: Request, res: Response) => {
    try {
      const transacao_uuid = req.params.uuid as string;

      const response = await transacaoService.deleteTransacao(transacao_uuid);
      if ("error" in response) {
        return res.status(400).json({ error: response.error });
      }
      return res
        .status(200)
        .json({ message: "Transação deletada com sucesso" });
    } catch (error) {
      console.error("Error in deleteTransacao:", error);
      return res.status(500).json({ error: "Erro ao deletar transação" });
    }
  },
};

export default transacaoController;
