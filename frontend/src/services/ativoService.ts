import { api } from "./api";

// Modelo básico para ativo
export interface Ativo {
  id: number;
  nome: string;
  valor: number;
}

// Modelo para alocação retornada pelo endpoint /clientes/:id/alocacoes
export interface Alocacao {
  ativoId: number;
  nome: string;
  valor: number;
  quantidade: number;
}

// Estrutura da resposta da rota /clientes/:id/alocacoes
export interface AlocacoesResponse {
  cliente: string;
  alocacoes: Alocacao[];
}
// Payload para vender um ativo


//  Para listar todos os ativos (fixos)
export const getAtivos = async (): Promise<Ativo[]> => {
  const response = await api.get<Ativo[]>("/ativos");
  return response.data;
};

//  Para listar as alocações de um cliente pelo ID
export const getAlocacoesPorCliente = async (
  clienteId: number
): Promise<AlocacoesResponse> => {
  const response = await api.get<AlocacoesResponse>(`/clientes/${clienteId}/alocacoes`);
  return response.data;
};

//  Payload para criar uma alocação (compra de ativo por cliente)
export interface AlocacaoPayload {
  clienteId: number;
  ativoId: number;
  quantidade: number;
}

//  Fazer POST de uma alocação
export const alocarAtivo = async (data: AlocacaoPayload): Promise<void> => {
  await api.post("/alocacoes", data);
};

