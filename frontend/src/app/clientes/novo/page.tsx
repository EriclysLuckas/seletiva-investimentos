"use client";
import { useAdicionarCliente } from "../../../hooks/useclientes/useAdicionarCliente"; // IMPORTAR hook de criar

import { ClienteForm } from "@/components/ClienteForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function NovoClientePage() {
  const { form, mutation } = useAdicionarCliente();  // usar hook de adicionar
  const router = useRouter();

  React.useEffect(() => {
    if (mutation.isSuccess) router.push("/clientes");
  }, [mutation.isSuccess, router]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-card p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Cliente</h1>
      <ClienteForm
        form={form}
        onSubmit={mutation.mutate}
        isPending={mutation.isPending}
        showStatus={false}
        onVoltar={() => router.push("/clientes")}
      />
    </div>
  );
}
