# Usa a imagem base do Node.js com Alpine
FROM node:alpine

# Atualiza o repositório e instala o Python3 e o pip
RUN apk update && apk add --no-cache \
  python3 \
  py3-pip

RUN npm install pm2 -g

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia todos os arquivos da aplicação para o container
COPY . .

# Expõe a porta 3009 para acessar o servidor
EXPOSE 3009

# Comando para iniciar a aplicação
CMD ["pm2-runtime", "start", "server.js"]
