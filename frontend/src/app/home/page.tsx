"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@/types";
import { transacoes } from "@/service/userService";
import { Dados, Transacao } from "@/types/index";
import TabelaDispesas from "@/components/TabelaDispesas";
import { Button } from "@/components/ui/button";
import DadosDoMes from "@/components/DadosDoMes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const usuario: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [showTabela, setShowTabela] = React.useState(false);
  const [dados, setDados] = React.useState<Dados>({
    uuid: "",
    entrada: 0,
    saida: 0,
    saldo: 0,
    mes: 0,
    ano: 0,
    transacoes: [],
  });
  const [transacoesArray, setTransacoesArray] = React.useState<Transacao[]>([]);
  const router = useRouter();

  const fetchTransacoes = async () => {
    try {
      console.log("usuario", usuario);
      const response = (await transacoes(usuario.uuid)) as
        | Dados
        | { error: string };

      if ("error" in response) {
        toast.error("erro ao buscar transações");
        return;
      }
      if (response && response.transacoes) {
        setDados(response);
        setTransacoesArray(response.transacoes);
      }
    } catch (error) {
      toast.error("Erro ao buscar transações");
      console.error("Erro ao buscar transações:", error);
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="flex flex-col mt-20 w-[90%] max-w-4xl p-6 shadow-xl rounded-2xl border items-center">
        <h2 className="text-lg font-medium mb-4">Movimentação do mês</h2>
        <DadosDoMes dados={dados} />

        <div className="flex gap-4 mb-4 w-full direction-row items-center justify-center">
          <Button
            onClick={() => setShowTabela((prev) => !prev)}
            className="bg-white text-black border w-[110px] border-white px-4 py-1 rounded-md hover:bg-black hover:text-white transition"
          >
            {showTabela ? "Ocultar tabela" : "Ver tabela"}
          </Button>
        </div>

        {showTabela && <TabelaDispesas transacoesArray={transacoesArray} />}
      </Card>
    </div>
  );
}
