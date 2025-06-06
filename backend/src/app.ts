import Fastify from 'fastify';
import cors from '@fastify/cors'; 
import { clienteRoutes } from './routes/clientes.routes';
import { ativoRoutes } from './routes/ativo.routes';
import { clienteAtivoRoutes } from './routes/clienteAtivo.routes';
import { setupErrorHandler } from './errorHandler'


export const app = Fastify();
app.register(cors, {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
app.register(clienteAtivoRoutes);
app.register(clienteRoutes);
app.register(ativoRoutes);


setupErrorHandler(app)
