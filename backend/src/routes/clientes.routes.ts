import { FastifyInstance } from 'fastify'
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  inativarCliente,
  buscarClientePorId
} from '../controllers/cliente.controller'

export async function clienteRoutes(app: FastifyInstance) {
   console.log("Registrando rotas de clientes");

 
  app.get('/clientes', listarClientes);
  app.get('/clientes/:id', buscarClientePorId); // <-- Adicione esta linha
  app.post('/clientes', criarCliente);
  app.put('/clientes/:id', atualizarCliente);
  app.delete('/clientes/:id', inativarCliente);
}