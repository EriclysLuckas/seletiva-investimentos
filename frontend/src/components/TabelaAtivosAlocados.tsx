// components/TabelaAtivosAlocados.tsx

"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlocacaoComNome } from "../types";

interface Props {
  alocados: AlocacaoComNome[];
}

export function TabelaAtivosAlocados({ alocados }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-8 mb-2">Ativos alocados</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Quantidade atual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alocados.map((a) => (
            <TableRow key={a.ativoId}>
              <TableCell>{a.nome}</TableCell>
              <TableCell>R$ {(a.valor * a.quantidade).toFixed(2)}</TableCell>
              <TableCell>{a.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
