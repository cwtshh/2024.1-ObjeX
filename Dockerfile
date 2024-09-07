# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Atualiza o repositório e instala o Python3 e o pip
RUN apk update && apk add --no-cache \
  python3 \
  py3-pip

# Copia os arquivos de dependências e instala apenas as dependências de produção
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --only=production

# Copia o código-fonte da aplicação
COPY . .

# Etapa 2: Criando a imagem final para produção com PM2
FROM node:18-alpine

# Instala o PM2 globalmente
RUN npm install pm2 -g

# Define o diretório de trabalho na nova imagem
WORKDIR /app

# Copia apenas as dependências da etapa anterior
COPY --from=builder /app/node_modules ./node_modules

# Copia o restante do código da aplicação
COPY --from=builder /app .

# Define a variável de ambiente NODE_ENV para produção
ENV NODE_ENV=production

# Atualiza o repositório e instala o Python3 e o pip
RUN apk update && apk add --no-cache \
  python3 \
  py3-pip

# Expõe a porta que a aplicação vai rodar (se necessário)
EXPOSE 3009

# Usa o PM2 para iniciar a aplicação
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
