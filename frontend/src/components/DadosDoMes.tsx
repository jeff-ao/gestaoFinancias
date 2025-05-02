import { Transacao, Dados } from "@/types";

interface DadosDoMesProps {
  dados: Dados;
}

export default function DadosDoMes({ dados }: DadosDoMesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <div className="bg-green-800 text-white px-4 py-2 rounded-xl shadow-md min-w-[120px] text-center">
        <span className="block text-sm">Entrada</span>
        <span className="text-lg font-bold">
          {dados.entrada.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-red-800 text-white px-4 py-2 rounded-xl shadow-md min-w-[120px] text-center">
        <span className="block text-sm">Saída</span>
        <span className="text-lg font-bold">
          {dados.saida.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="bg-orange-700 text-white px-4 py-2 rounded-xl shadow-md min-w-[120px] text-center">
        <span className="block text-sm">Saldo</span>
        <span className="text-lg font-bold">
          {dados.saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
}
