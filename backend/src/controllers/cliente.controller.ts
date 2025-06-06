import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { createClienteSchema, updateClienteSchema, paramsIdSchema } from '../schemas/cliente.schema'

export async function listarClientes(req: FastifyRequest, reply: FastifyReply) {
  try {
    const clientes = await prisma.cliente.findMany()
    return reply.status(200).send(clientes)
  } catch {
    return reply.status(500).send({ error: 'Erro ao buscar clientes.' })
  }
}

export async function criarCliente(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = createClienteSchema.parse(req.body)
    const novoCliente = await prisma.cliente.create({ data })
    return reply.status(201).send(novoCliente)
  } catch (error: any) {
    console.error('Erro ao criar cliente:', error) // <-- Adicione esta linha
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return reply.status(409).send({ error: 'Email já cadastrado.' })
    }
    if (error.name === 'ZodError') {
      return reply.status(400).send({ error: 'Dados inválidos.', details: error.errors })
    }
    return reply.status(500).send({ error: 'Erro ao criar cliente.' })
  }
}

export async function buscarClientePorId(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = paramsIdSchema.parse(req.params) // id já é number

    const cliente = await prisma.cliente.findUnique({
      where: { id }
    })

    if (!cliente) {
      return reply.status(404).send({ message: "Cliente não encontrado" })
    }

    return reply.status(200).send(cliente)
  } catch (error) {
    console.error('Erro ao buscar cliente por id:', error)
    return reply.status(500).send({ error: 'Erro interno do servidor.' })
  }
}

export async function atualizarCliente(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = paramsIdSchema.parse(req.params)
    const data = updateClienteSchema.parse(req.body)

    const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } })
    if (!cliente) return reply.status(404).send({ error: 'Cliente não encontrado.' })

    const atualizado = await prisma.cliente.update({ where: { id: Number(id) }, data })
    return reply.status(200).send(atualizado)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({ error: 'Dados inválidos.', details: error.errors })
    }
    if (error.code === 'P2002') {
      return reply.status(409).send({ error: 'Email já está em uso.' })
    }
    return reply.status(500).send({ error: 'Erro ao atualizar cliente.' })
  }
}

export async function inativarCliente(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = paramsIdSchema.parse(req.params)
    const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } })
    if (!cliente) return reply.status(404).send({ error: 'Cliente não encontrado.' })

    const inativado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { status: false },
    })

    return reply.status(200).send({ message: 'Cliente inativado com sucesso.', cliente: inativado })
  } catch {
    return reply.status(500).send({ error: 'Erro ao inativar cliente.' })
  }
}
