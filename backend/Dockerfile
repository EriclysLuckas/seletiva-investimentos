# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json antes, para aproveitar cache
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da pasta backend
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Comando padrão é apenas iniciar o servidor (demais comandos são feitos no docker-compose)
CMD ["npm", "run", "dev"]
