import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCliente } from "@/services/clienteService";
import { AxiosError } from "axios"; // Se estiver usando axios no cliente



const clienteSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  status: z.boolean(),
});
type ClienteForm = z.infer<typeof clienteSchema>;

export function useAdicionarCliente() {
  const queryClient = useQueryClient();

  const form = useForm<ClienteForm>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: "",
      email: "",
      status: true,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ClienteForm) =>
      createCliente({
        ...data,
        status: data.status ?? true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      alert("Cliente cadastrado com sucesso!");
      form.reset();
    },
    onError: (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 409) {
      form.setError("email", { type: "manual", message: "E-mail já cadastrado" });
      return;
    }
  }
  alert("Erro ao cadastrar cliente, tente novamente.");
},
  });

  return { form, mutation };
}
