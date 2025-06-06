import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { alocarAtivoSchema, paramsIdSchema } from '../schemas/clienteAtivo.schema'
import type { ClienteAtivo } from '@prisma/client'



// Handler para alocar um ativo a um cliente
// Este handler recebe o ID do cliente e do ativo, e a quantidade a ser alocada
export async function alocarAtivo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = alocarAtivoSchema.parse(request.body)

    const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } })
    if (!cliente) return reply.status(404).send({ error: 'Cliente não encontrado.' })

    const ativo = await prisma.ativo.findUnique({ where: { id: data.ativoId } })
    if (!ativo) return reply.status(404).send({ error: 'Ativo não encontrado.' })

    const alocacao = await prisma.clienteAtivo.upsert({
      where: {
        clienteId_ativoId: {
          clienteId: data.clienteId,
          ativoId: data.ativoId,
        }
      },
      update: {
         quantidade: {
          increment: data.quantidade, // Incrementa a quantidade se já existir alocação
    },
      },
      create: {
        clienteId: data.clienteId,
        ativoId: data.ativoId,
        quantidade: data.quantidade,
      }
    })

    return reply.status(201).send(alocacao)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({ error: 'Dados inválidos.', details: error.errors })
    }
    return reply.status(500).send({ error: 'Erro ao alocar ativo.' })
  }
}
// Handler para listar alocações de um cliente
// Este handler recebe o ID do cliente e retorna suas alocações com os ativos
export async function listarAlocacoesPorCliente(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = paramsIdSchema.parse(request.params)

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: {
        alocacoes: {
          include: { ativo: true },
        },
      },
    })

    if (!cliente) {
      return reply.status(404).send({ error: 'Cliente não encontrado.' })
    }

    // Aqui tipamos o alocacao corretamente
    type AlocacaoComAtivo = ClienteAtivo & { ativo: { nome: string; valor: number } }

    const alocacoes = cliente.alocacoes.map((alocacao: AlocacaoComAtivo) => ({
      ativoId: alocacao.ativoId,
      nome: alocacao.ativo.nome,
      valor: alocacao.ativo.valor,
      quantidade: alocacao.quantidade,
    }))

    return reply.status(200).send({ cliente: cliente.nome, alocacoes })
  } catch {
    return reply.status(500).send({ error: 'Erro ao buscar alocações do cliente.' })
  }
}


interface VenderAtivoBody {
  clienteId: number;
  ativoId: number;
  quantidade: number;
}

