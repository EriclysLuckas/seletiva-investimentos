import { FastifyInstance } from 'fastify'
import { listarAtivos } from '../controllers/ativo.controller'

export async function ativoRoutes(app: FastifyInstance) {
  app.get('/ativos', listarAtivos)
}
