import { z } from 'zod'

export const alocarAtivoSchema = z.object({
  clienteId: z.number().int().positive(),
  ativoId: z.number().int().positive(),
  quantidade: z.number().int().positive().default(1),
})

// Schema para validar o parâmetro id da rota /clientes/:id/alocacoes
export const paramsIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id deve ser um número').transform(Number),
})
export const listarAlocacoesPorClienteSchema = z.object({
  params: paramsIdSchema,
})
export const listarAlocacoesSchema = z.object({})
export const listarAlocacoesPorIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'id deve ser um número').transform(Number),
  }),
})