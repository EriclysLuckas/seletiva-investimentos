import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const ativos = [
    { id: 1, nome: 'Ação XYZ', valor: 100 },
    { id: 2, nome: 'Fundo ABC', valor: 250.5 },
    { id: 3, nome: 'Tesouro Direto', valor: 500 },
    { id: 4, nome: 'Cripto BTC', valor: 30000 },
  ]

  for (const ativo of ativos) {
    await prisma.ativo.upsert({
      where: { id: ativo.id },
      update: {}, // não atualiza se já existe, apenas evita erro
      create: {
        id: ativo.id,
        nome: ativo.nome,
        valor: ativo.valor,
      },
    })
  }

  console.log('Seed concluído com sucesso.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
