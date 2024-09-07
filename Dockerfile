FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

FROM node:alpine

RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app .

ENV NODE_ENV=production

EXPOSE 3001

CMD ["pm2-runtime", "start", "ecosystem.config.js"]