FROM node:alpine

RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3009

CMD ["npm", "run", "server"]