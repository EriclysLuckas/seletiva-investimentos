import { FastifyRequest, FastifyReply } from 'fastify'

export async function listarAtivos(_: FastifyRequest, reply: FastifyReply) {
  const ativosFixos = [
    { id: 1, nome: 'Ação XYZ', valor: 100.0 },
    { id: 2, nome: 'Fundo ABC', valor: 250.5 },
    { id: 3, nome: 'Tesouro Direto', valor: 500.0 },
    { id: 4, nome: 'Cripto BTC', valor: 30000.0 },
  ]

  return reply.status(200).send(ativosFixos)
}
