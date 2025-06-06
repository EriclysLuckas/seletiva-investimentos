// components/TabelaAtivosDisponiveis.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ativo } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alocarAtivo } from "@/services/ativoService";

interface Props {
  ativos: Ativo[];
  clienteId: number;
}

export function TabelaAtivosDisponiveis({ ativos, clienteId }: Props) {
  const queryClient = useQueryClient();
  const [quantidadeAlocar, setQuantidadeAlocar] = useState<Record<number, number>>({});

  const alocarMutation = useMutation({
    mutationFn: ({ ativoId, quantidade }: { ativoId: number; quantidade: number }) =>
      alocarAtivo({ clienteId, ativoId, quantidade }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alocacoes", clienteId] });
      setQuantidadeAlocar({});
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Ativos disponíveis para alocar</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Quantidade para alocar</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ativos.map((ativo) => (
            <TableRow key={ativo.id}>
              <TableCell>{ativo.nome}</TableCell>
              <TableCell>R$ {ativo.valor.toFixed(2)}</TableCell>
              <TableCell>
                <input
                  type="number"
                  min={1}
                  value={quantidadeAlocar[ativo.id] || ""}
                  onChange={(e) =>
                    setQuantidadeAlocar((prev) => ({
                      ...prev,
                      [ativo.id]: Number(e.target.value),
                    }))
                  }
                  style={{ width: "60px" }}
                  className="border border-gray-300 rounded px-2 py-1 w-20 text-white bg-transparent"

                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    const qtd = quantidadeAlocar[ativo.id];
                    if (!qtd || qtd <= 0) {
                      alert("Informe uma quantidade válida para alocar");
                      return;
                    }
                    alocarMutation.mutate({ ativoId: ativo.id, quantidade: qtd });
                  }}
                >
                  Alocar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
