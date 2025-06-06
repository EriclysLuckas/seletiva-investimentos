import { FastifyInstance } from 'fastify';
import { clienteRoutes } from './cliente.routes';
import { ativoRoutes } from './ativo.routes';

export async function appRoutes(app: FastifyInstance) {
  await clienteRoutes(app);
  await ativoRoutes(app);
}
