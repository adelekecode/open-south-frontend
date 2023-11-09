FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 5050

CMD ["yarn", "preview"]
