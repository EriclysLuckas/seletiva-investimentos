import { api } from "./api";

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  status: boolean;
}

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>("/clientes");
  return response.data;
};

export const createCliente = async (data: Omit<Cliente, "id">): Promise<Cliente> => {
  const response = await api.post<Cliente>("/clientes", data);
  return response.data;
};

export const updateCliente = async (id: number, data: Omit<Cliente, "id">): Promise<Cliente> => {
  const response = await api.put<Cliente>(`/clientes/${id}`, data);
  return response.data;
};
export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await api.get<Cliente>(`/clientes/${id}`);
  return response.data;
};