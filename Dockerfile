# Stage 1: Build React application
FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]