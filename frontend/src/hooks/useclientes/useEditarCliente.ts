import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClienteById, updateCliente, Cliente } from "@/services/clienteService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const clienteSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  status: z.boolean(),
});
type ClienteForm = z.infer<typeof clienteSchema>;

export function useEditarCliente() {
  const params = useParams();
  const id = Number(params.id);
  const queryClient = useQueryClient();

  const { data: cliente, isLoading } = useQuery<Cliente>({
    queryKey: ["cliente", id],
    queryFn: () => getClienteById(id),
    enabled: !!id,
  });

  const form = useForm<ClienteForm>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: "",
      email: "",
      status: true,
    },
  });

  useEffect(() => {
    if (cliente) {
      form.reset({
        nome: cliente.nome,
        email: cliente.email,
        status: cliente.status,
      });
    }
  }, [cliente, form]);

  const mutation = useMutation({
    mutationFn: (data: ClienteForm) => updateCliente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      alert("Cliente atualizado com sucesso!");
    },
  });

  return { form, mutation, isLoading, cliente };
}