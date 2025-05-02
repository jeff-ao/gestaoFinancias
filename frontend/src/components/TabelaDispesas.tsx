import { Transacao } from "@/types/";

interface TabelaDispesasProps {
  transacoesArray: Transacao[];
}

export default function TabelaDispesas({
  transacoesArray,
}: TabelaDispesasProps) {
  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="w-full table-auto border-collapse ">
        <thead>
          <tr className="text-left border-b border-muted">
            <th className="pb-2 text-center">Despesa</th>
            <th className="pb-2 text-center">Valor</th>
            <th className="pb-2 text-center">Categoria</th>
            <th className="pb-2 text-center">Data</th>
          </tr>
        </thead>
        <tbody>
          {transacoesArray.map((transacao) => (
            <tr key={transacao.uuid} className="border-b border-muted/50">
              <td className="py-2 text-center">{transacao.descricao}</td>
              <td
                className={`py-2 text-center ${
                  transacao.tipo === "entrada"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transacao.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="py-2 text-center">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-muted">
                  {transacao.categoria}
                </span>
              </td>
              <td className="py-2 text-center">
                {new Date(transacao.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
