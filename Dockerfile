# Etapa 1: Construir a aplicação
FROM node:18 AS builder 

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte
COPY . .

# Executar a build
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos da build do Vite para o diretório que o Nginx serve
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 5173

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]