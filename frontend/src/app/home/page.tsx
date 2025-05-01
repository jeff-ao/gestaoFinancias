"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@/types";
import { transacoes } from "@/service/userService";
import { Dados, Transacao } from "@/types/index";
import TabelaDispesas from "@/components/TabelaDispesas";

export default function Home() {
  const usuario: User = JSON.parse(localStorage.getItem("user") || "{}");
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
      <Card className="flex flex-col mt-20 w-[90%] max-w-4xl p-6 shadow-xl rounded-2xl border">
        <TabelaDispesas transacoesArray={transacoesArray} />
      </Card>
    </div>
  );
}
