import { Transacao } from "@/types/";

interface TabelaDispesasProps {
  transacoesArray: Transacao[];
}

export default function TabelaDispesas({
  transacoesArray,
}: TabelaDispesasProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Todas as despesas</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b border-muted">
              <th className="pb-2">Despesa</th>
              <th className="pb-2">Valor</th>
              <th className="pb-2">Categoria</th>
              <th className="pb-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {transacoesArray.map((transacao) => (
              <tr key={transacao.uuid} className="border-b border-muted/50">
                <td className="py-2">{transacao.descricao}</td>
                <td className="py-2 text-red-500">
                  {transacao.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="py-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-muted">
                    {transacao.categoria}
                  </span>
                </td>
                <td className="py-2">
                  {new Date(transacao.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="pt-4">Total</td>
              <td className="pt-4 text-red-600">
                {transacoesArray
                  .filter((t) => t.tipo === "saida")
                  .reduce((acc, t) => acc + t.valor, 0)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
