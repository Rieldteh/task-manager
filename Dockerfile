FROM node:18-alpine

WORKDIR /app

COPY src /app/src

COPY .env ./

COPY package.json ./

COPY package-lock.json ./

COPY eslint.config.mjs ./

COPY tsconfig.json ./

COPY prisma ./

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
