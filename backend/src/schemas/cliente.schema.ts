import { z } from 'zod'

export const createClienteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  status: z.boolean().default(true),
})

export const updateClienteSchema = z.object({
  nome: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.boolean().optional(),
})

export const paramsIdSchema = z.object({
  id: z.coerce.number().int().positive(), // já vira número e valida
})
