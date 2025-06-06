import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  status: z.boolean().default(true), 
});

export type ClienteForm = z.infer<typeof clienteSchema>;