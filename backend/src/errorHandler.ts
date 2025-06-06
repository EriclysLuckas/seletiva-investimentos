// src/errorHandler.ts

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export function setupErrorHandler(app: FastifyRequest['server']) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    console.error(error)  // Log para debug

    if (error.validation) {
      // Erros de validação do Fastify ou Zod podem vir aqui
      return reply.status(400).send({
        error: 'Validation Error',
        details: error.validation,
      })
    }

    // Personalize outros erros do Prisma, por exemplo
    if ((error as any).code === 'P2002') {
      return reply.status(409).send({
        error: 'Conflict - Unique constraint failed',
        details: (error as any).meta?.target,
      })
    }

    // Caso geral: Internal Server Error
    return reply.status(500).send({ error: 'Internal Server Error' })
  })
}
