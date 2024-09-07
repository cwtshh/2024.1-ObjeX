# Usa a imagem base do Node.js com Alpine
FROM node:alpine AS builder

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Atualiza o repositório e instala o Python3 e o pip
RUN apk update && apk add --no-cache \
  python3 \
  py3-pip

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia todos os arquivos da aplicação para o container
COPY . .

FROM node:alpine

RUN npm install pm2 -g

COPY --from=builder /usr/src/app .

ENV NODE_ENV=production

# Expõe a porta 3009 para acessar o servidor
EXPOSE 3009

# Comando para iniciar a aplicação
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
