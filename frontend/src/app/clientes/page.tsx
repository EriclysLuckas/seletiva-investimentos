"use client";
import { useQuery } from "@tanstack/react-query";
import { getClientes, Cliente } from "@/services/clienteService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import React from "react";

export default function ClientesPage() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<Cliente[]>({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });

  return (
    <div style={{ maxWidth: 800, margin: "32px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>Clientes</h1>

        {/* Botão para navegar para a página de cadastro */}
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/clientes/novo")}
        >
          Adicionar Cliente
        </Button>
      </div>

      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar clientes</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{cliente.status ? "Ativo" : "Inativo"}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => router.push(`/clientes/${cliente.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => router.push(`/clientes/${cliente.id}/ativos`)}
                >
                  Ativos
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
