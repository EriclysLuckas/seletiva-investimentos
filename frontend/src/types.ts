
export interface Ativo {
  id: number;
  nome: string;
  valor: number;
}

export interface AlocacaoComNome {
  ativoId: number;
  nome: string;
  valor: number;
  quantidade: number;
}