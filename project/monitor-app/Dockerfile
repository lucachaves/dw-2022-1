FROM node:18-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:deploy" ]
