FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# must match API_PORT
EXPOSE 4000

CMD ["yarn", "start"]
