FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# Этот порт должен совпадать с API_PORT
EXPOSE 4000

CMD ["yarn", "start"]
