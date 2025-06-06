import { z } from 'zod'

export const ativoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  valor: z.number(),
})

export const listaDeAtivosSchema = z.array(ativoSchema)
