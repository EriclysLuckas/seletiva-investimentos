import { FastifyInstance } from 'fastify'
import { alocarAtivo, listarAlocacoesPorCliente } from '../controllers/clienteAtivo.controller'

export async function clienteAtivoRoutes(app: FastifyInstance) {
  app.post('/alocacoes', alocarAtivo)
  app.get('/clientes/:id/alocacoes', listarAlocacoesPorCliente)

}
