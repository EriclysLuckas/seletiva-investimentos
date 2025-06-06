"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAtivos, getAlocacoesPorCliente } from "../../../../services/ativoService";
import { TabelaAtivosDisponiveis } from "@/components/TabelaAtivosDisponiveis";
import { TabelaAtivosAlocados } from "@/components/TabelaAtivosAlocados";

export default function AtivosDoClientePage() {
  const { id } = useParams<{ id: string }>();
  const clienteId = Number(id);

  const { data: ativos } = useQuery({
    queryKey: ["ativos"],
    queryFn: getAtivos,
  });

  const { data: alocacoesData } = useQuery({
    queryKey: ["alocacoes", clienteId],
    queryFn: () => getAlocacoesPorCliente(clienteId),
  });

  const alocados = alocacoesData?.alocacoes || [];
  const clienteNome = alocacoesData?.cliente;

  return (
    <div style={{ maxWidth: 800, margin: "32px auto" }}>
      <h1 className="text-2xl font-semibold mb-4">
        Ativos de {clienteNome ?? "Cliente"}
      </h1>

      {ativos && (
        <TabelaAtivosDisponiveis ativos={ativos} clienteId={clienteId} />
      )}

      <TabelaAtivosAlocados alocados={alocados} />
    </div>
  );
}
