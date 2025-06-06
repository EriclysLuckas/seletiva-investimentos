

#🐬 Backend + Banco de Dados (MySQL): Rodando em containers Docker

#🌐 Frontend (Next.js + ShadCN UI): Iniciado localmente via npm run dev

#📁 Estrutura do Projeto
bash
Copiar
Editar
📦 seletiva-investimentos
├── backend/           # Fastify + Prisma
├── frontend/          # Next.js + ShadCN
├── docker-compose.yml # Orquestração dos containers
🚀 Instruções para rodar o projeto
1️⃣ Rodar o banco de dados e o backend (via Docker)
Requisitos: Docker e Docker Compose

bash
Copiar
Editar
# Na raiz do projeto (onde está o docker-compose.yml)
docker-compose up --build
Isso vai:

Subir o MySQL na porta 3306

Rodar o backend Fastify na porta 3333

Executar automaticamente as migrations, seed e iniciar o servidor

#2️⃣ Rodar o frontend (local)
Requisitos: Node.js v18+ e npm

bash
Copiar
Editar
# Clone o repositório
git clone (https://github.com/EriclysLuckas/seletiva-investimentos)

# Acesse a pasta do frontend
cd seletiva-investimentos/frontend

# Instale as dependências
npm install

# Inicie o servidor Next.js
npm run dev
Acesse: http://localhost:3000

⚙️ Variáveis de ambiente
O backend já está configurado no docker-compose.yml, com as seguintes credenciais:

env
Copiar
Editar
MYSQL_DATABASE=investimentos
MYSQL_USER=dev
MYSQL_PASSWORD=devpass
MYSQL_ROOT_PASSWORD=root
E o Prisma usa:

env
Copiar
Editar
DATABASE_URL=mysql://dev:devpass@db:3306/investimentos
🧪 Funcionalidades
✅ Cadastro, edição e listagem de clientes

✅ Listagem de ativos disponíveis

✅ Alocação de ativos por cliente

✅ Interface responsiva com ShadCN UI

✅ Backend com Fastify + Prisma

📦 Tecnologias
Frontend: Next.js, React, TypeScript, ShadCN UI, React Hook Form, React Query

Backend: Node.js, Fastify, Prisma, MySQL

DevOps: Docker, Docker Compose

📅 Prazo de entrega
🗓 06/06 — Projeto entregue com todos os requisitos solicitados.
