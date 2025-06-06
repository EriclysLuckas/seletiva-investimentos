"use client";
import { useQuery } from "@tanstack/react-query";
import { getAtivos, Ativo } from "@/services/ativoService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

export default function AtivosPage() {
  const { data, isLoading, error } = useQuery<Ativo[]>({
    queryKey: ["ativos"],
    queryFn: getAtivos,
     // <-- veja o conteúdo real

  });
console.log("ativos:", data);
  return (
    <div style={{ maxWidth: 800, margin: "32px auto" }}>
      <h1 className="text-2xl font-bold mb-6">Lista de Ativos</h1>

      {isLoading && <div>Carregando ativos...</div>}
      {error && <div>Erro ao carregar ativos</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((ativo) => (
            <TableRow key={ativo.id}>
              <TableCell>{ativo.nome}</TableCell>
              <TableCell>
                {typeof ativo.valor === "number" ? `R$ ${ativo.valor.toFixed(2)}` : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
