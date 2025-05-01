export class DadosHomeDTO {
  uuid: string;
  entrada: number;
  saida: number;
  saldo: number;
  mes: number;
  ano: number;
  transacoes: TransacaoDTO[];
  constructor(dados: any) {
    this.uuid = dados.uuid;
    this.entrada = dados.entrada;
    this.saida = dados.saida;
    this.saldo = dados.saldo;
    this.mes = dados.MesAno.mes;
    this.ano = dados.MesAno.ano;
    this.transacoes = dados.transacoes.map(
      (transacao: any) => new TransacaoDTO(transacao)
    );
  }
}
export class TransacaoDTO {
  uuid: string;
  valor: number;
  tipo: string;
  descricao: string;
  data: string;
  categoria: string;
  constructor(transacao: any) {
    this.uuid = transacao.uuid;
    this.valor = transacao.valor;
    this.tipo = transacao.tipo;
    this.descricao = transacao.descricao;
    this.data = transacao.data.toISOString().split("T")[0];
    this.categoria = transacao.Categoria.nome;
  }
}
