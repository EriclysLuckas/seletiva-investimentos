"use client";

import { useEditarCliente } from "../../../hooks/useclientes/useEditarCliente";
import { ClienteForm } from "@/components/ClienteForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditarClientePage() {
  const { form, mutation, isLoading, cliente } = useEditarCliente();
  const router = useRouter();

  React.useEffect(() => {
    if (mutation.isSuccess) router.push("/clientes");
  }, [mutation.isSuccess, router]);

  if (isLoading) return <div>Carregando...</div>;
  if (!cliente) return <div>Cliente não encontrado.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-card p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <ClienteForm
        form={form}
        onSubmit={data => mutation.mutate({ ...data, status: data.status ?? true })}
        isPending={mutation.isPending}
        showStatus={true}
        onVoltar={() => router.push("/clientes")}
      />
    </div>
  );
}