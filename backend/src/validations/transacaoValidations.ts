import { Transacao } from "../types/index";

export function validarTransacao(data: Transacao): string | null {
  const { tipo, valor, descricao, data: dataStr, Categoria } = data;

  if (tipo !== "entrada" && tipo !== "saida")
    return "Tipo de transação inválido";
  if (!valor || valor <= 0) return "Valor inválido";
  if (!descricao) return "Descrição inválida";
  if (!dataStr) return "Data inválida";
  if (!Categoria?.nome) return "Categoria inválida";

  return null;
}
